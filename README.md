# oo Pixel Homepage

一个给「oo」做的可爱像素风个人主页 MVP。技术栈是 React + Vite + TypeScript，没有后端，也不需要 API key。

## Run

```bash
npm install
npm run dev
```

开发服务默认运行在：

```text
http://127.0.0.1:5173/
```

生产构建检查：

```bash
npm run build
```

## Content

所有可替换内容集中在：

```text
src/data/siteContent.ts
```

你可以在这里替换：

- oo 的名字与 Hero 文案
- 漂浮水果元素
- 相册和视频卡片
- AI 作品列表
- Markdown 项目介绍
- 思维导图节点
- 页脚文案

## Real Media TODO

当前照片和视频都是本地 CSS 占位组件。后续换真实素材时，优先看这些组件里的 TODO：

- `src/components/MemoryCard.tsx`
- `src/components/PixelVideoPlaceholder.tsx`
- `src/components/WorkCard.tsx`

建议把真实素材放在 `public/` 下面，然后在 mock 数据里维护路径。
