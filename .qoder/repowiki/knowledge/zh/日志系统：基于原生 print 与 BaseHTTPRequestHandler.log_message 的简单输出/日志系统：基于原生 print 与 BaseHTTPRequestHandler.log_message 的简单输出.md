---
kind: logging_system
name: 日志系统：基于原生 print 与 BaseHTTPRequestHandler.log_message 的简单输出
category: logging_system
scope:
    - '**'
source_files:
    - server.py
    - scripts/crop-oo-grid.mjs
---

本仓库未引入任何专用日志框架（如 Python 的 logging、console.log 封装、结构化日志库等），而是采用最基础的文本输出来实现日志记录，属于“无正式日志系统”的实现方式。

- Python 后端（server.py）：
  - 通过重写 `BaseHTTPRequestHandler.log_message` 将 HTTP 请求日志以 `[时间戳] 消息` 格式打印到标准输出（第 276-277 行）。
  - 启动/停止时通过 `print` 输出应用状态信息（第 285-290 行）。
  - 错误处理直接返回 JSON 响应体，不写入独立日志文件。
- 前端（React + Vite）：
  - 未发现对 `console.log` / `console.warn` / `console.error` 的集中封装或过滤策略，仅在脚本工具 `scripts/crop-oo-grid.mjs` 中有一处 `console.log(JSON.stringify(...))` 用于调试输出。
- 图像生成脚本（scripts/image_gen.py）：
  - 未使用 logging 模块，错误信息通过子进程 stdout/stderr 回传给 server.py 并在响应中透传（第 252-261 行）。

整体特点：
- 无日志级别管理（INFO/WARN/ERROR 等），所有输出均为纯文本。
- 无结构化字段、无日志聚合或持久化存储，仅依赖控制台输出。
- 前端与后端均无统一的日志配置入口，无法集中开关或调整输出格式。

约束与约定（基于代码实际行为描述）：
- HTTP 请求日志统一由 `AppHandler.log_message` 格式化输出，包含时间戳与原始消息。
- 服务端异常通过 HTTP 状态码 + JSON error 字段对外暴露，内部细节限制在 stderr 前 3000 字符内返回（第 258 行）。
- 前端调试输出仅出现在构建脚本中，运行时组件未添加 console 调用。