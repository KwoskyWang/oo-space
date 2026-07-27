---
kind: error_handling
name: 错误处理策略：Python 网关与 CLI 的健壮性设计
category: error_handling
scope:
    - '**'
source_files:
    - server.py
    - scripts/image_gen.py
    - src/hooks/useSeasonTheme.ts
    - src/components/OoPixelAvatar.tsx
---

本仓库的错误处理围绕两条主线展开：作为网关的 Python HTTP 服务器（server.py）和图像生成 CLI（scripts/image_gen.py），前端 React 应用仅做轻量级容错。整体采用「参数校验失败快速返回 + 外部调用重试退避 + 结构化 JSON 错误响应」的模式，未定义统一的异常类型体系。

### 1. Python 网关（server.py）
- 请求入口统一通过 `AppHandler` 的 `do_GET` / `do_POST` 分发，所有分支均显式返回 `json_response` 或 `text_response`，保证响应体结构一致。
- 参数校验失败直接返回 400 并附带中文 `error` 字段（如缺少 `OPENAI_API_KEY`、prompt 为空），不抛异常。
- 子进程调用 `subprocess.run` 包裹在 try/except 中：`TimeoutExpired` 映射为 504；非零 returncode 映射为 500，并将 stderr/stdout 最后 3000 字符放入 `detail` 字段。
- 文件服务对不存在路径返回 404，越权访问返回 403，未匹配路由返回 404。
- 全局日志通过重写 `log_message` 输出到 stdout，无错误级别分类。

### 2. 图像生成 CLI（scripts/image_gen.py）
- 使用 `_die(message, code=1)` 统一终止流程：打印 `Error: ...` 到 stderr 并 `raise SystemExit(code)`，所有参数校验函数（size/quality/background/model/input-fidelity 等）均通过 `_die` 退出。
- 依赖缺失通过 `_dependency_hint(package)` 给出安装提示，再以 `_die` 退出。
- 网络调用采用异步重试机制：`_generate_one_with_retries` 基于 `_is_transient_error` 判断是否可重试，支持从异常属性或消息中提取 `retry_after` 秒数，指数退避上限 60s；非瞬态错误直接向上抛出。
- 批量任务 `_run_generate_batch` 使用 `asyncio.gather` 并发执行，捕获每个 job 的异常并记录 stderr，支持 `--fail-fast` 模式立即中断。
- 所有 I/O 操作（文件写入、Pillow 缩放）均包裹在 try/except 中，失败时打印警告或继续下一条。

### 3. 前端（React + TypeScript）
- 仅在 `useSeasonTheme.ts` 中使用 `try/catch` 读取 localStorage，失败时回退默认值。
- `OoPixelAvatar.tsx` 监听图片加载 `onError` 事件，用于降级显示。
- 其余组件未实现统一错误边界或全局错误处理，依赖浏览器默认行为。

### 4. 约定与约束
- 服务端错误响应统一为 `{ error: string, detail?: string }` 结构，HTTP 状态码区分客户端错误（400/404/403）、超时（504）与服务端错误（500）。
- CLI 工具以 `SystemExit` 作为唯一退出信号，禁止静默失败；所有用户可见错误均通过 stderr 输出。
- 外部 API 调用必须包含重试逻辑，且能识别速率限制（429）与超时类错误。
- 前端不依赖后端错误类型，仅消费 JSON 中的 `error` 字段进行提示。