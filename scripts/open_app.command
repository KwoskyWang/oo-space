#!/bin/zsh
cd "$(dirname "$0")/.."

echo "Starting GPT Image 2 local web app..."
echo "Folder: $(pwd)"

if ! command -v python3 >/dev/null 2>&1; then
  echo ""
  echo "Python 3 is required. Install it, then run this file again."
  read -r "?Press Enter to close."
  exit 1
fi

python3 - <<'PY'
try:
    import openai
    from packaging.version import Version
    raise SystemExit(0 if Version(openai.__version__) >= Version("2.0.0") else 1)
except Exception:
    raise SystemExit(1)
PY

if [ "$?" != "0" ]; then
  echo "Installing/upgrading Python packages: openai packaging"
  python3 -m pip install --user --upgrade openai packaging
fi

(sleep 1; open "http://127.0.0.1:8765") &
python3 server.py
