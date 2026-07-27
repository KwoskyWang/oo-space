---
kind: configuration_system
name: 配置系统 — JSON 配置文件与环境变量叠加的本地服务器配置加载
category: configuration_system
scope:
    - '**'
source_files:
    - server.py
    - config.example.json
    - scripts/image_gen.py
    - .gitignore
    - package.json
---

本项目的配置系统围绕 Python 本地 HTTP 服务器（server.py）展开，采用「JSON 配置文件 + 环境变量」双层叠加的方式加载 OpenAI GPT Image 相关参数，并通过 `/api/config` 接口暴露给前端。具体机制如下：

1. 配置文件来源与格式
- 根目录提供 `config.example.json` 作为模板，包含 `OPENAI_API_KEY`、`OPENAI_BASE_URL`、`OPENAI_API_BASE`、`MODEL`、`QUALITY`、`SIZE` 六个键。
- 实际运行时读取 `config.json`（该文件在 `.gitignore` 中被忽略，避免泄露密钥），通过 `json.loads` 解析为字典。

2. 加载顺序与覆盖规则
- `load_config()` 函数先读取 `config.json`，再对每个键执行 `config.get(key) or os.getenv(key, default)`，即：环境变量优先级高于 JSON 文件中的值，未设置时回退到默认值。
- 例如 `OPENAI_API_KEY` 的默认值为空字符串，`MODEL` 默认为 `gpt-image-2`，`QUALITY` 默认为 `medium`，`SIZE` 默认为 `1024x1024`。

3. 运行时注入方式
- server.py 将合并后的配置以 `env` 字典形式传递给子进程 `scripts/image_gen.py`，其中 `OPENAI_API_KEY`、`OPENAI_BASE_URL`、`OPENAI_API_BASE` 被显式注入。
- image_gen.py 通过 `os.getenv("OPENAI_API_KEY")` 检查密钥是否存在，不存在则直接终止并提示导出。

4. 前端可见的配置接口
- GET `/api/config` 返回精简后的配置对象：`model`、`quality`、`size`、`baseUrl`（优先使用 `OPENAI_BASE_URL`，否则回退到 `OPENAI_API_BASE`）、`hasApiKey`（布尔标志）。前端据此决定是否允许用户发起图像生成请求。

5. 其他运行期配置
- 端口号通过 `PORT` 环境变量覆盖，默认 `8765`。
- Vite 开发/构建脚本通过 `package.json` 的 `scripts` 字段定义，无额外配置文件。

6. 约束与校验
- image_gen.py 对 `--model`、`--size`、`--quality`、`--background`、`--output-format`、`--n`、`--concurrency`、`--max-attempts`、`--output-compression` 等参数进行严格校验，超出允许集合或范围会直接报错退出。
- gpt-image-2 模型有额外的尺寸限制（最大边长 ≤ 3840px、宽高比 ≤ 3:1、总像素 655360~8294400、必须为 16 的倍数）。

7. 安全约定
- `config.json` 被 git 忽略，密钥不应提交至仓库；示例模板中用占位符提示替换。
- 前端仅能读取非敏感的配置摘要（不包含 API Key），真正的密钥仅在服务端进程间传递。

整体设计简洁明确：JSON 文件用于持久化默认值，环境变量用于覆盖（尤其适合容器/CI 场景），子进程通过标准环境变量通信，前端通过 REST 接口获取最小必要信息。