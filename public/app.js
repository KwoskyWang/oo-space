const messages = document.querySelector("#messages");
const form = document.querySelector("#composer");
const promptInput = document.querySelector("#promptInput");
const imageInput = document.querySelector("#imageInput");
const pickButton = document.querySelector("#pickButton");
const thumbs = document.querySelector("#thumbs");
const sendButton = document.querySelector("#sendButton");
const clearButton = document.querySelector("#clearButton");
const statusLine = document.querySelector("#statusLine");
const sizeInput = document.querySelector("#sizeInput");
const qualityInput = document.querySelector("#qualityInput");
let chatHistory = [];

function addMessage(role, content, options = {}) {
  const article = document.createElement("article");
  article.className = `message ${role}${options.error ? " error" : ""}`;
  const bubble = document.createElement("div");
  bubble.className = "bubble";

  if (content instanceof Node) {
    bubble.append(content);
  } else {
    bubble.textContent = content;
  }

  article.append(bubble);
  messages.append(article);
  messages.scrollTop = messages.scrollHeight;
  return article;
}

function renderThumbs() {
  thumbs.innerHTML = "";
  for (const file of imageInput.files) {
    const box = document.createElement("div");
    box.className = "thumb";
    const img = document.createElement("img");
    img.alt = file.name;
    img.src = URL.createObjectURL(file);
    img.onload = () => URL.revokeObjectURL(img.src);
    box.append(img);
    thumbs.append(box);
  }
}

function resultNode(data) {
  const wrap = document.createElement("div");
  wrap.className = "result";

  const img = document.createElement("img");
  img.alt = "生成结果";
  img.src = `${data.imageUrl}?t=${Date.now()}`;
  wrap.append(img);

  const actions = document.createElement("div");
  actions.className = "actions";

  const download = document.createElement("a");
  download.href = data.imageUrl;
  download.download = data.filePath.split("/").pop() || "gpt-image2.png";
  download.textContent = "下载图片";
  actions.append(download);

  const location = document.createElement("span");
  location.textContent = `已保存：${data.filePath}`;
  actions.append(location);

  wrap.append(actions);
  return wrap;
}

async function loadConfig() {
  try {
    const res = await fetch("/api/config");
    const cfg = await res.json();
    statusLine.textContent = `${cfg.model} · ${cfg.baseUrl || "默认接口"} · ${cfg.hasApiKey ? "密钥已配置" : "缺少密钥"}`;
    if (cfg.size) sizeInput.value = cfg.size;
    if (cfg.quality) qualityInput.value = cfg.quality;
  } catch {
    statusLine.textContent = "本地服务未就绪";
  }
}

pickButton.addEventListener("click", () => imageInput.click());
imageInput.addEventListener("change", renderThumbs);

clearButton.addEventListener("click", () => {
  messages.innerHTML = "";
  chatHistory = [];
  addMessage("assistant", "已清空。继续输入新要求就可以生成下一张。");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const prompt = promptInput.value.trim();
  if (!prompt) {
    promptInput.focus();
    return;
  }

  const files = Array.from(imageInput.files);
  addMessage("user", files.length ? `${prompt}\n\n参考图：${files.length} 张` : prompt);
  chatHistory.push({ role: "user", text: files.length ? `${prompt} (参考图 ${files.length} 张)` : prompt });

  const pending = addMessage("assistant", files.length ? "正在根据参考图生成..." : "正在生成图片...");
  sendButton.disabled = true;
  sendButton.textContent = "生成中";

  const data = new FormData();
  data.append("prompt", prompt);
  data.append("size", sizeInput.value);
  data.append("quality", qualityInput.value);
  data.append("mode", files.length ? "edit" : "generate");
  data.append("history", JSON.stringify(chatHistory.slice(0, -1)));
  for (const file of files) data.append("images", file);

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      body: data,
    });
    const payload = await res.json();
    pending.remove();

    if (!res.ok) {
      addMessage("assistant", payload.detail ? `${payload.error}\n${payload.detail}` : payload.error, { error: true });
      chatHistory.push({ role: "assistant", text: payload.error || "生成失败" });
      return;
    }

    addMessage("assistant", resultNode(payload));
    chatHistory.push({ role: "assistant", text: `已生成图片：${payload.filePath}` });
    promptInput.value = "";
  } catch (error) {
    pending.remove();
    addMessage("assistant", `请求失败：${error.message}`, { error: true });
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = "生成";
  }
});

loadConfig();
