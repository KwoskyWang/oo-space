---
kind: dependency_management
name: Node.js + Python 双栈依赖管理
category: dependency_management
scope:
    - '**'
source_files:
    - package.json
    - package-lock.json
    - server.py
    - scripts/image_gen.py
---

本项目采用 Node.js（前端）与 Python（后端/脚本）双栈并行的依赖管理模式，各自使用语言生态的标准工具进行声明与锁定。

**前端依赖管理（npm）**
- 使用 `package.json` 作为唯一依赖清单，通过 `dependencies` 声明运行时依赖（react、react-dom、vite、typescript、@vitejs/plugin-react），通过 `devDependencies` 声明开发期依赖（@types/react、@types/react-dom）。
- 版本策略：所有包均使用 `^` 语义化版本前缀，允许小版本/补丁自动升级。
- 依赖锁定：`package-lock.json` 已提交至仓库，确保构建可重现。
- 构建脚本：`scripts.dev/build/preview` 分别调用 `vite` 和 `tsc -b`，无自定义安装或 vendoring 逻辑。
- 未使用私有 npm 源、`.npmrc` 或 `pnpm-lock.yaml`/`yarn.lock`。

**Python 依赖管理（无显式清单文件）**
- 项目未提供 `requirements.txt`、`pyproject.toml`、`setup.py` 等标准依赖声明文件。
- Python 代码直接 import 第三方库（如 `openai`、`PIL`），并在缺失时通过 `_dependency_hint()` 提示用户使用 `uv pip install <package>` 安装。
- `server.py` 仅依赖 Python 标准库（`http.server`、`json`、`pathlib`、`subprocess` 等），无需额外安装。
- `scripts/image_gen.py` 依赖 `openai` SDK（可选 `AsyncOpenAI`）和 `Pillow`（用于图片缩放，按需导入），两者均为运行时动态检测缺失。
- 依赖安装由用户手动执行 `uv pip install openai pillow`，或由 `_dependency_hint()` 输出命令提示。

**跨语言协作方式**
- `server.py` 通过 `subprocess.run` 调用 `scripts/image_gen.py`，以命令行参数传递模型、质量、尺寸等配置，环境变量注入 `OPENAI_API_KEY`、`OPENAI_BASE_URL`、`OPENAI_API_BASE`。
- 前端通过 Vite 静态资源服务访问 `public/` 目录，Python 服务器提供 `/api/generate` 和 `/images/*` 接口，二者通过 HTTP 通信，无共享依赖。

**约束与约定**
- 前端依赖必须通过 `npm install` 安装，禁止手动修改 `node_modules`。
- Python 依赖需在使用前通过 `uv pip install` 安装到当前环境，未提供自动化依赖解析。
- 敏感配置（OpenAI API Key、Base URL）通过 `config.json` 或环境变量注入，不写入代码。