export type FruitKind =
  | "dragonfruit"
  | "avocado"
  | "mango"
  | "strawberry"
  | "orange"
  | "star"
  | "heart"
  | "flower";

export type FloatingFruit = {
  id: string;
  kind: FruitKind;
  label: string;
  emoji?: string;
  startX: number;
  startY: number;
  size: number;
  duration: number;
  delay: number;
  drift: "a" | "b" | "c";
  layer: "near" | "mid" | "far";
};

export type MemoryCard = {
  id: string;
  type: "image" | "video";
  title: string;
  description: string;
  spanishLine: string;
  dateLabel: string;
  tags: string[];
  palette: "sun" | "hangzhou" | "fruit" | "work" | "weekend";
};

export type MindMapNode = {
  id: string;
  label: string;
  angle: number;
};

export type WorkItem = {
  id: string;
  title: string;
  description: string;
  markdown: string;
  mediaPalette: "weekly" | "spanish" | "hotel";
  mindMapNodes: MindMapNode[];
};

export type HeroPose = {
  id: string;
  src: string;
  alt: string;
  label: string;
  offsetX?: number;
  offsetY?: number;
};

export const siteContent = {
  owner: {
    name: "oo",
    spanishIntro: "Hola, soy oo",
    greeting: "Bienvenid@ a mi página",
  },
  hero: {
    title: "Hola, soy oo",
    subtitleSpanish: "Una chica dulce, curiosa y brillante ✨",
    subtitleChinese: "一个可爱、好奇、闪闪发光的小姑娘",
    characterPoses: [
      {
        id: "wave",
        src: "/assets/oo-poses-7/oo_pixel_pose_01_wave.png",
        alt: "oo 挥手",
        label: "wave",
      },
      {
        id: "avocado",
        src: "/assets/oo-poses-7/oo_pixel_pose_02_avocado.png",
        alt: "oo 拿着牛油果",
        label: "avocado",
      },
      {
        id: "coding",
        src: "/assets/oo-poses-7/oo_pixel_pose_03_coding_laptop.png",
        alt: "oo 在电脑前工作",
        label: "coding",
      },
      {
        id: "reading",
        src: "/assets/oo-poses-7/oo_pixel_pose_04_reading.png",
        alt: "oo 看书",
        label: "reading",
      },
      {
        id: "dragonfruit",
        src: "/assets/oo-poses-7/oo_pixel_pose_06_dragonfruit.png",
        alt: "oo 拿着火龙果",
        label: "dragonfruit",
      },
      {
        id: "pointing",
        src: "/assets/oo-poses-7/oo_pixel_pose_07_pointing.png",
        alt: "oo 指向前方",
        label: "pointing",
      },
    ] satisfies HeroPose[],
    marqueeLines: [
      "欢迎来到 oo 的主页~ 很高兴认识你~",
      "Bienvenid@ a la página de oo ~ Encantada de conocerte ~",
      "Hola, soy oo · España · Hangzhou · IA · Dulce vida",
    ],
    scrollHintChinese: "向下滑，继续认识 oo ↓",
    scrollHintSpanish: "Desliza para conocer más",
  },
  floatingFruits: [
    {
      id: "fruit-dragon-1",
      kind: "dragonfruit",
      label: "火龙果",
      startX: 8,
      startY: 18,
      size: 58,
      duration: 18,
      delay: -4,
      drift: "a",
      layer: "near",
    },
    {
      id: "fruit-avocado-1",
      kind: "avocado",
      label: "牛油果",
      emoji: "🥑",
      startX: 78,
      startY: 16,
      size: 44,
      duration: 24,
      delay: -10,
      drift: "b",
      layer: "mid",
    },
    {
      id: "fruit-mango-1",
      kind: "mango",
      label: "芒果",
      emoji: "🥭",
      startX: 18,
      startY: 72,
      size: 46,
      duration: 21,
      delay: -8,
      drift: "c",
      layer: "mid",
    },
    {
      id: "fruit-strawberry-1",
      kind: "strawberry",
      label: "草莓",
      emoji: "🍓",
      startX: 88,
      startY: 68,
      size: 50,
      duration: 19,
      delay: -2,
      drift: "a",
      layer: "near",
    },
    {
      id: "fruit-orange-1",
      kind: "orange",
      label: "橙子",
      emoji: "🍊",
      startX: 64,
      startY: 82,
      size: 38,
      duration: 26,
      delay: -14,
      drift: "b",
      layer: "far",
    },
    {
      id: "fruit-star-1",
      kind: "star",
      label: "小星星",
      emoji: "⭐",
      startX: 34,
      startY: 14,
      size: 24,
      duration: 16,
      delay: -3,
      drift: "c",
      layer: "far",
    },
    {
      id: "fruit-heart-1",
      kind: "heart",
      label: "小爱心",
      emoji: "💗",
      startX: 72,
      startY: 46,
      size: 28,
      duration: 17,
      delay: -11,
      drift: "a",
      layer: "mid",
    },
    {
      id: "fruit-flower-1",
      kind: "flower",
      label: "小花朵",
      emoji: "🌼",
      startX: 9,
      startY: 48,
      size: 30,
      duration: 23,
      delay: -6,
      drift: "b",
      layer: "far",
    },
    {
      id: "fruit-star-2",
      kind: "star",
      label: "小星星",
      emoji: "✨",
      startX: 52,
      startY: 28,
      size: 22,
      duration: 20,
      delay: -13,
      drift: "a",
      layer: "mid",
    },
  ] satisfies FloatingFruit[],
  memories: [
    {
      id: "spain-sun",
      type: "image",
      title: "在西班牙的阳光里",
      description: "那些午后的街角、明亮的墙面和慢慢变金色的天空，都是 oo 的西语记忆。",
      spanishLine: "Un pedacito de sol español.",
      dateLabel: "España · 2023",
      tags: ["España", "Recuerdos", "Viaje"],
      palette: "sun",
    },
    {
      id: "hangzhou-days",
      type: "image",
      title: "杭州的日常",
      description: "下班路上的风、咖啡店里的光和认真生活的每一天，组成了现在的 oo。",
      spanishLine: "La vida cotidiana también brilla.",
      dateLabel: "Hangzhou · Now",
      tags: ["Hangzhou", "Pequeños momentos"],
      palette: "hangzhou",
    },
    {
      id: "fruit-planet",
      type: "video",
      title: "可爱的水果星球",
      description: "一个留给真实视频的位置：可以放水果、旅行、vlog，或者 oo 的任何可爱瞬间。",
      spanishLine: "Dulce vida, dulce planeta.",
      dateLabel: "Momentos · Video",
      tags: ["Dulce vida", "Momentos"],
      palette: "fruit",
    },
    {
      id: "work-oo",
      type: "image",
      title: "努力工作的 oo",
      description: "在杭州认真发光，处理任务、学习新工具，也悄悄把生活变得更有秩序。",
      spanishLine: "Trabajar con calma y corazón.",
      dateLabel: "Hangzhou · Work",
      tags: ["Hangzhou", "IA", "Brillante"],
      palette: "work",
    },
    {
      id: "weekend-happy",
      type: "image",
      title: "周末的小快乐",
      description: "甜品、散步、电影和一点点发呆，是给一周充电的小小魔法。",
      spanishLine: "Pequeñas alegrías del finde.",
      dateLabel: "Weekend · Comida",
      tags: ["Comida", "Pequeños momentos"],
      palette: "weekend",
    },
  ] satisfies MemoryCard[],
  works: [
    {
      id: "ai-weekly",
      title: "AI 周报生成器",
      description: "把零散工作记录整理成一份清晰、有重点、适合复盘的双语周报。",
      mediaPalette: "weekly",
      markdown: `## 项目背景
oo 希望把每周的任务、会议记录和学习笔记快速整理成一份漂亮周报，减少重复排版时间。

## 解决的问题
- 信息分散在聊天、文档和待办事项中
- 周报容易写成流水账
- 中文总结和西语表达需要保持自然

## 使用的 AI 工具
- 大语言模型用于归纳、改写和结构化输出
- Prompt 模板用于统一语气和版式
- 本地 mock 数据用于快速验证页面展示

## Prompt 思路
先要求模型提取「完成事项、风险、下周计划、亮点」，再用温柔但专业的语气生成摘要。

## 结果展示
输出一份可以直接粘贴到工作文档里的周报，带有重点列表、情绪温度和行动项。

## 后续优化方向
- 支持从 Markdown 文件导入
- 自动生成西语版 resumen
- 加入周报历史对比`,
      mindMapNodes: [
        { id: "input", label: "输入整理", angle: -90 },
        { id: "summary", label: "重点摘要", angle: -25 },
        { id: "tone", label: "温柔语气", angle: 35 },
        { id: "bilingual", label: "双语输出", angle: 105 },
        { id: "review", label: "周复盘", angle: 175 },
      ],
    },
    {
      id: "spanish-prompt",
      title: "西语学习 Prompt 助手",
      description: "为西语学习者生成对话练习、词汇卡片和语法纠错建议。",
      mediaPalette: "spanish",
      markdown: `## 项目背景
西语学习需要大量真实语境练习，但很多练习材料不够贴近日常表达。

## 解决的问题
- 练习内容缺少场景感
- 语法错误不知道为什么错
- 口语表达容易变得生硬

## 使用的 AI 工具
- 对话生成模型
- 语法解释 Prompt
- 难度分级模板

## Prompt 思路
让 AI 扮演温柔的西语老师，先对话、再纠错、最后给出更自然的替代表达。

## 结果展示
学习者可以得到「场景对话 + 中文解释 + 西语例句 + 记忆提示」。

## 后续优化方向
- 加入 DELE 等级标签
- 根据错题自动生成复习卡
- 支持语音跟读脚本`,
      mindMapNodes: [
        { id: "dialog", label: "场景对话", angle: -88 },
        { id: "grammar", label: "语法解释", angle: -20 },
        { id: "vocab", label: "词汇卡", angle: 45 },
        { id: "level", label: "难度分级", angle: 112 },
        { id: "review", label: "复习计划", angle: 180 },
      ],
    },
    {
      id: "hotel-kb",
      title: "酒店订单智能客服知识库",
      description: "把酒店订单规则、常见问题和处理流程整理成可检索的客服知识库。",
      mediaPalette: "hotel",
      markdown: `## 项目背景
酒店订单客服场景中，规则多、时效强，人工查找会占用大量时间。

## 解决的问题
- 取消、改期、发票等规则分散
- 新客服上手成本高
- 回复口径需要统一且礼貌

## 使用的 AI 工具
- 知识库问答模型
- FAQ 结构化模板
- 意图识别 Prompt

## Prompt 思路
先判断用户意图，再检索对应规则，最后输出「可直接发送」和「内部处理建议」两版答案。

## 结果展示
客服可以更快找到政策依据，并用清晰语气回应用户。

## 后续优化方向
- 接入真实订单状态
- 增加多语言客服回复
- 支持满意度反馈闭环`,
      mindMapNodes: [
        { id: "faq", label: "FAQ", angle: -90 },
        { id: "intent", label: "意图识别", angle: -18 },
        { id: "policy", label: "规则检索", angle: 46 },
        { id: "reply", label: "回复口径", angle: 116 },
        { id: "feedback", label: "反馈闭环", angle: 180 },
      ],
    },
  ] satisfies WorkItem[],
  footer: {
    spanish: "Hecho con amor, frutas y un poquito de IA.",
    chinese: "用爱、水果和一点点 AI 做成。",
  },
};
