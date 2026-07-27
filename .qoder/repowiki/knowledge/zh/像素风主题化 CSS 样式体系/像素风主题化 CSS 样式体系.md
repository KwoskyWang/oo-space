---
kind: frontend_style
name: 像素风主题化 CSS 样式体系
category: frontend_style
scope:
    - '**'
source_files:
    - src/styles/tokens.css
    - src/styles/themes.css
    - src/styles/global.css
    - src/styles/pixel.css
    - src/styles/pixel-hero.css
    - src/styles/pixel-memory.css
    - src/styles/pixel-works.css
    - src/styles/pixel-about-footer.css
    - src/styles/pixel-effects-responsive.css
---

该站点采用纯 CSS + CSS 变量（CSS Custom Properties）构建的像素风格主题系统，基于 React + Vite 前端工程组织。整体风格围绕“像素风”视觉语言展开，通过设计令牌、主题切换与响应式断点实现一致的视觉体验。

**系统与工具**
- 样式方案：原生 CSS + CSS 变量，无 Sass/Less/Styled-components 等预处理或 CSS-in-JS
- 构建工具：Vite 直接编译 .css 文件，无额外样式打包插件
- 字体栈："Trebuchet MS", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", system-ui, sans-serif，配合 "Courier New" 等 monospace 字体营造像素感
- 像素渲染：全局使用 `image-rendering: pixelated` 确保像素图清晰

**设计令牌体系**
- `src/styles/tokens.css`：集中定义所有设计令牌，包括尺寸（--hero-avatar-size-*、--space-*）、阴影（--pixel-shadow-*）、间距、z-index 层级、动画时长（--motion-*）等
- `src/styles/themes.css`：通过 `html[data-season="summer"]` / `html[data-season="winter"]` 属性选择器切换完整主题色板，覆盖颜色变量（--cream、--paper、--dragonfruit、--mango 等）及组件级样式
- `src/styles/global.css`：全局基础样式，包含颜色变量默认值、字体、背景渐变、通用组件类（.pixel-button、.pixel-card、.pixel-tag 等）

**模块化组织**
- `src/styles/pixel.css`：入口文件，通过 @import 聚合各模块样式
- `src/styles/pixel-hero.css`：头部导航、英雄区、像素女孩角色、浮动水果、滚动提示等
- `src/styles/pixel-memory.css`：记忆卡片网格、艺术插图、视频占位符、分隔线等
- `src/styles/pixel-works.css`：作品展示卡片、思维导图、Markdown 视图等
- `src/styles/pixel-about-footer.css`：关于页面、能力条、页脚明信片等
- `src/styles/pixel-effects-responsive.css`：所有 @keyframes 动画与响应式媒体查询

**主题切换机制**
- 通过 JavaScript 动态设置 `html` 元素的 `data-season` 属性（"summer" | "winter"）
- 冬季主题覆盖约 300 行 CSS，重新定义所有颜色变量并针对每个组件提供特定样式覆盖
- 过渡动画：`seasonFade` 关键帧配合 `.site-shell::after` 伪元素实现季节切换时的淡入效果
- 支持 `prefers-reduced-motion` 媒体查询，自动禁用动画以满足无障碍需求

**响应式策略**
- 三个主要断点：980px（平板）、720px（小屏手机）、420px（极小屏）
- 使用 `clamp()` 函数实现流体排版（如标题字号 `clamp(2rem, 5vw, 4.2rem)`）
- 移动端优先调整布局：网格从 3 列 → 2 列 → 1 列，导航简化为图标模式
- 像素边框宽度在移动端适当减小以保持视觉比例

**像素风视觉特征**
- 硬边阴影：所有阴影使用 `box-shadow: Xpx Ypx 0 color` 形式，无模糊半径
- 像素边框：统一使用 2-4px 实线边框，颜色为 --pixel-dark
- 阶梯动画：大量使用 `steps(n, end)` 时间函数模拟像素动画帧
- 装饰元素：大量使用伪元素（::before、::after）创建像素风格的装饰框、标签、贴纸
- 渐变背景：多层 linear-gradient 叠加创建像素风格的背景纹理和网格

**组件样式约定**
- BEM 命名：`.component__element--modifier` 结构（如 `.pixel-girl__stage`、`.memory-card__body`）
- 状态类：通过 `.is-active`、`.is-visible` 等类名管理组件状态
- 焦点可见性：统一使用 `outline: var(--pixel-outline)` 确保键盘导航可见性
- 悬停效果：统一的 `-2px -3px` 位移 + 阴影增强，保持像素风的立体感