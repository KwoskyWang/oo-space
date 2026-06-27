#!/usr/bin/env python3
from __future__ import annotations

import json
import mimetypes
import os
from pathlib import Path
import re
import subprocess
import sys
import time
from email.parser import BytesParser
from email.policy import default
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlparse


ROOT = Path(__file__).resolve().parent
PUBLIC = ROOT / "public"
UPLOADS = ROOT / "uploads"
OUTPUT = ROOT / "output" / "imagegen"
CONFIG_PATH = ROOT / "config.json"
IMAGE_CLI = ROOT / "scripts" / "image_gen.py"
HOST = "127.0.0.1"
PORT = int(os.getenv("PORT", "8765"))


def load_config() -> dict:
    config = {}
    if CONFIG_PATH.exists():
        config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    return {
        "OPENAI_API_KEY": config.get("OPENAI_API_KEY") or os.getenv("OPENAI_API_KEY", ""),
        "OPENAI_BASE_URL": config.get("OPENAI_BASE_URL") or os.getenv("OPENAI_BASE_URL", ""),
        "OPENAI_API_BASE": config.get("OPENAI_API_BASE") or os.getenv("OPENAI_API_BASE", ""),
        "MODEL": config.get("MODEL") or os.getenv("MODEL", "gpt-image-2"),
        "QUALITY": config.get("QUALITY") or os.getenv("QUALITY", "medium"),
        "SIZE": config.get("SIZE") or os.getenv("SIZE", "1024x1024"),
    }


def safe_name(name: str) -> str:
    stem = Path(name or "upload").stem
    suffix = Path(name or "").suffix.lower()
    stem = re.sub(r"[^a-zA-Z0-9._-]+", "-", stem).strip("-._") or "upload"
    if suffix not in {".png", ".jpg", ".jpeg", ".webp"}:
        suffix = ".png"
    return f"{int(time.time() * 1000)}-{stem[:60]}{suffix}"


def parse_multipart(handler: BaseHTTPRequestHandler) -> tuple[dict[str, str], list[tuple[str, bytes]]]:
    content_type = handler.headers.get("Content-Type", "")
    content_length = int(handler.headers.get("Content-Length", "0") or "0")
    body = handler.rfile.read(content_length)

    if not content_type.startswith("multipart/form-data"):
        return {}, []

    raw = (
        f"Content-Type: {content_type}\r\n"
        "MIME-Version: 1.0\r\n"
        "\r\n"
    ).encode("utf-8") + body
    message = BytesParser(policy=default).parsebytes(raw)

    fields: dict[str, str] = {}
    files: list[tuple[str, bytes]] = []
    for part in message.iter_parts():
        if part.get_content_disposition() != "form-data":
            continue
        name = part.get_param("name", header="content-disposition")
        filename = part.get_param("filename", header="content-disposition")
        payload = part.get_payload(decode=True) or b""
        if not name:
            continue
        if filename:
            files.append((filename, payload))
        else:
            charset = part.get_content_charset() or "utf-8"
            fields[name] = payload.decode(charset, errors="replace")
    return fields, files


def json_response(handler: BaseHTTPRequestHandler, status: int, payload: dict) -> None:
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def text_response(handler: BaseHTTPRequestHandler, status: int, text: str) -> None:
    body = text.encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "text/plain; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def serve_file(handler: BaseHTTPRequestHandler, path: Path) -> None:
    if not path.exists() or not path.is_file():
        text_response(handler, 404, "Not found")
        return
    mime, _ = mimetypes.guess_type(str(path))
    body = path.read_bytes()
    handler.send_response(200)
    handler.send_header("Content-Type", mime or "application/octet-stream")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


class AppHandler(BaseHTTPRequestHandler):
    server_version = "GPTImageLocal/1.0"

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        raw_path = unquote(parsed.path)

        if raw_path == "/api/config":
            cfg = load_config()
            json_response(
                self,
                200,
                {
                    "model": cfg["MODEL"],
                    "quality": cfg["QUALITY"],
                    "size": cfg["SIZE"],
                    "baseUrl": cfg["OPENAI_BASE_URL"] or cfg["OPENAI_API_BASE"],
                    "hasApiKey": bool(cfg["OPENAI_API_KEY"]),
                },
            )
            return

        if raw_path.startswith("/images/"):
            name = Path(raw_path.removeprefix("/images/")).name
            serve_file(self, OUTPUT / name)
            return

        if raw_path in {"/", ""}:
            serve_file(self, PUBLIC / "index.html")
            return

        requested = (PUBLIC / raw_path.lstrip("/")).resolve()
        if PUBLIC.resolve() in requested.parents or requested == PUBLIC.resolve():
            serve_file(self, requested)
            return
        text_response(self, 403, "Forbidden")

    def do_POST(self) -> None:
        if urlparse(self.path).path != "/api/generate":
            text_response(self, 404, "Not found")
            return

        cfg = load_config()
        if not cfg["OPENAI_API_KEY"]:
            json_response(self, 400, {"error": "config.json 里缺少 OPENAI_API_KEY。"})
            return

        fields, files = parse_multipart(self)

        prompt = (fields.get("prompt") or "").strip()
        if not prompt:
            json_response(self, 400, {"error": "请输入作图提示词。"})
            return
        history_text = ""
        try:
            history = json.loads(fields.get("history") or "[]")
            if isinstance(history, list):
                compact = []
                for entry in history[-8:]:
                    if not isinstance(entry, dict):
                        continue
                    role = str(entry.get("role") or "").strip()
                    text = str(entry.get("text") or "").strip()
                    if role and text:
                        compact.append(f"{role}: {text[:800]}")
                if compact:
                    history_text = "\n".join(compact)
        except Exception:
            history_text = ""

        effective_prompt = prompt
        if history_text:
            effective_prompt = (
                "Conversation context for this image request:\n"
                f"{history_text}\n\n"
                f"Current image request: {prompt}"
            )

        size = (fields.get("size") or cfg["SIZE"]).strip()
        quality = (fields.get("quality") or cfg["QUALITY"]).strip()
        mode_hint = (fields.get("mode") or "auto").strip()

        upload_paths: list[Path] = []
        UPLOADS.mkdir(parents=True, exist_ok=True)
        OUTPUT.mkdir(parents=True, exist_ok=True)

        for filename, data in files:
            if not data:
                continue
            target = UPLOADS / safe_name(filename)
            target.write_bytes(data)
            upload_paths.append(target)

        output_name = f"{time.strftime('%Y%m%d-%H%M%S')}-{int(time.time() * 1000) % 1000:03d}.png"
        output_path = OUTPUT / output_name

        command = [
            sys.executable,
            str(IMAGE_CLI),
            "edit" if upload_paths else "generate",
            "--model",
            cfg["MODEL"],
            "--prompt",
            effective_prompt,
            "--quality",
            quality,
            "--size",
            size,
            "--output-format",
            "png",
            "--out",
            str(output_path),
            "--force",
        ]
        for image_path in upload_paths:
            command.extend(["--image", str(image_path)])

        env = os.environ.copy()
        env["OPENAI_API_KEY"] = cfg["OPENAI_API_KEY"]
        if cfg["OPENAI_BASE_URL"]:
            env["OPENAI_BASE_URL"] = cfg["OPENAI_BASE_URL"]
        if cfg["OPENAI_API_BASE"]:
            env["OPENAI_API_BASE"] = cfg["OPENAI_API_BASE"]

        try:
            completed = subprocess.run(
                command,
                cwd=str(ROOT),
                env=env,
                text=True,
                capture_output=True,
                timeout=600,
            )
        except subprocess.TimeoutExpired:
            json_response(self, 504, {"error": "生成超时，请稍后重试。"})
            return

        if completed.returncode != 0:
            json_response(
                self,
                500,
                {
                    "error": "生成失败。",
                    "detail": (completed.stderr or completed.stdout).strip()[-3000:],
                },
            )
            return

        json_response(
            self,
            200,
            {
                "message": "完成",
                "mode": "edit" if upload_paths else "generate",
                "modeHint": mode_hint,
                "imageUrl": f"/images/{output_name}",
                "filePath": str(output_path),
                "stdout": completed.stdout.strip(),
            },
        )

    def log_message(self, fmt: str, *args) -> None:
        print(f"[{self.log_date_time_string()}] {fmt % args}")


def main() -> int:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    UPLOADS.mkdir(parents=True, exist_ok=True)
    OUTPUT.mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer((HOST, PORT), AppHandler)
    print(f"GPT Image 2 local web app is running at http://{HOST}:{PORT}")
    print("Press Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
