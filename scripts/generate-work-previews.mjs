import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve("public/assets/works");
await mkdir(outDir, { recursive: true });

const ink = "#302138";
const colors = { pink: "#f7c9df", blue: "#c8e8f5", green: "#d9edce", yellow: "#ffe89a", paper: "#fffcf5" };

function rect(x, y, w, h, fill, stroke = 3) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${ink}" stroke-width="${stroke}"/>`;
}

function text(x, y, value, size = 24, weight = 500, color = ink) {
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}">${value}</text>`;
}

function windowFrame(x, y, w, h, fill, label) {
  return rect(x + 8, y + 8, w, h, "#cdb5bd", 0)
    + rect(x, y, w, h, colors.paper, 4)
    + rect(x, y, w, 46, fill, 0)
    + `<path d="M${x} ${y + 46}H${x + w}" stroke="${ink}" stroke-width="3"/>`
    + [colors.pink, colors.yellow, colors.green].map((c, i) => rect(x + 16 + i * 21, y + 16, 12, 12, c, 1)).join("")
    + text(x + 91, y + 30, label, 19, 600);
}

function arrow(x, y) {
  return `<path d="M${x} ${y}h32m-10-10 10 10-10 10" fill="none" stroke="${ink}" stroke-width="4"/>`;
}

const previews = [
  {
    filename: "desktop-ai-todo.svg",
    title: "桌面 AI 待办助手",
    subtitle: "让待办自己会判断",
    backdrop: "#f6dfeb",
    art: windowFrame(60, 158, 570, 432, colors.pink, "今日待办")
      + text(85, 243, "今天先做什么？", 28, 700)
      + text(85, 277, "AI 排期 · 附理由与时间", 22, 500, "#756273")
      + rect(85, 301, 520, 91, colors.yellow)
      + rect(102, 321, 18, 18, colors.paper, 2)
      + text(137, 342, "整理项目方案", 26, 700)
      + text(137, 376, "35 分钟 · 临近截止，优先处理", 21)
      + rect(85, 409, 520, 67, colors.blue)
      + rect(102, 431, 18, 18, colors.paper, 2)
      + text(137, 451, "准备周会材料", 25, 600)
      + text(479, 451, "20 分钟", 21)
      + rect(85, 492, 520, 67, colors.green)
      + rect(102, 514, 18, 18, colors.paper, 2)
      + text(137, 534, "核对本周数据", 25, 600)
      + windowFrame(658, 201, 242, 268, colors.blue, "任务拆解")
      + text(682, 290, "01  整理素材", 23)
      + text(682, 337, "02  提炼结论", 23)
      + text(682, 384, "03  复核方案", 23)
      + text(682, 435, "参考历史估时", 20, 500, "#756273")
      + `<path d="M762 501h96v16h16v76h-16v16h-96v-16h-16v-76h16z" fill="${colors.yellow}" stroke="${ink}" stroke-width="4"/>`
      + rect(774, 539, 11, 16, ink, 0)
      + rect(838, 539, 11, 16, ink, 0)
      + `<path d="M791 573h39" stroke="${ink}" stroke-width="5"/>`
      + rect(844, 485, 40, 38, colors.pink)
      + text(856, 512, "3", 25, 700)
      + text(727, 646, "悬浮球 · 持续可见", 21)
  },
  {
    filename: "ai-weekly-report.svg",
    title: "AI 周报生成器",
    subtitle: "从零散素材到有结论的飞书周报",
    backdrop: "#d8eaf0",
    art: text(62, 192, "工作素材", 26, 700)
      + rect(62, 217, 286, 61, colors.yellow)
      + text(84, 257, "文字 · 表格 · 截图", 24)
      + `<path d="M203 280v30" stroke="${ink}" stroke-width="3" stroke-dasharray="6 5"/>`
      + rect(62, 316, 286, 167, colors.pink)
      + text(84, 355, "自定义 Skill", 28, 700)
      + text(84, 398, "职责与业务口径", 23)
      + text(84, 439, "数据校验与表达要求", 23)
      + arrow(367, 400)
      + rect(62, 522, 286, 79, colors.green)
      + text(84, 554, "缺失信息集中列出", 23, 600)
      + text(84, 584, "数据待补充", 22)
      + windowFrame(428, 161, 470, 470, colors.blue, "飞书文档")
      + text(454, 253, "本周工作周报", 30, 700)
      + rect(453, 276, 419, 58, colors.yellow, 0)
      + text(469, 314, "01  核心结果", 25, 700)
      + text(469, 378, "02  业务进展", 24)
      + text(469, 438, "03  传播效果判断", 24)
      + text(469, 498, "04  本周问题", 24)
      + text(469, 558, "05  下周重点", 24)
      + `<path d="M453 350h419M453 410h419M453 470h419M453 530h419" stroke="#d2cbd0" stroke-width="2"/>`
      + text(454, 608, "结论先行 · 数据佐证", 21, 600, "#35728a")
  },
  {
    filename: "product-update-popup.svg",
    title: "产品弹窗制作",
    subtitle: "把产品更新转化为客户看得懂的内容",
    backdrop: "#e5ebd8",
    art: text(61, 193, "产品更新记录", 26, 700)
      + rect(61, 219, 272, 71, colors.green)
      + text(81, 263, "飞书多维表格", 25)
      + `<path d="M194 292v29" stroke="${ink}" stroke-width="3" stroke-dasharray="6 5"/>`
      + rect(61, 328, 272, 172, colors.blue)
      + text(81, 367, "Skill · 逐条核对", 26, 700)
      + text(81, 409, "功能变化 / 适用版本", 22)
      + text(81, 451, "区分新增与优化", 24)
      + text(81, 480, "保留事实边界", 21, 500, "#756273")
      + arrow(355, 410)
      + rect(61, 537, 272, 74, colors.yellow)
      + text(81, 581, "ChatGPT 配套图片", 23, 600)
      + windowFrame(418, 161, 480, 470, colors.pink, "酒店产品更新")
      + text(445, 255, "功能小标题", 31, 700)
      + rect(445, 277, 426, 47, colors.yellow, 0)
      + text(461, 310, "适用版本：正式名称", 23)
      + text(445, 369, "功能变化 ＋ 客户价值", 26, 600)
      + `<path d="M445 394h402M445 417h372" stroke="#d2cbd0" stroke-width="8"/>`
      + rect(445, 449, 426, 127, colors.blue, 2)
      + `<path d="M465 551l70-66 44 35 55-47 67 78z" fill="${colors.green}" stroke="${ink}" stroke-width="3"/>`
      + rect(722, 479, 125, 66, colors.paper, 2)
      + text(735, 519, "配套图片", 23, 600)
      + text(445, 610, "文案与视觉素材 · 逐条审核", 21, 600, "#85704e")
  }
];

function svgFor({ title, subtitle, backdrop, art }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 960 720">
  <defs>
    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M24 0H0V24" fill="none" stroke="#ffffff" stroke-opacity=".55"/>
    </pattern>
    <style>text { font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif; }</style>
  </defs>
  <rect width="960" height="720" fill="${backdrop}"/>
  <rect width="960" height="720" fill="url(#grid)"/>
  ${text(60, 74, title, 38, 800)}
  ${text(61, 117, subtitle, 23)}
  ${art}
  ${text(61, 687, "PROJECT / 界面与流程示意", 18, 500, "#756273")}
  </svg>`;
}

for (const preview of previews) {
  await writeFile(path.join(outDir, preview.filename), svgFor(preview));
}
