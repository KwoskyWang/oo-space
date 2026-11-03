export type FruitKind =
  | "dragonfruit"
  | "avocado"
  | "mango"
  | "strawberry"
  | "orange"
  | "star"
  | "heart"
  | "flower";

export type NavItem = {
  id: string;
  href: string;
  label: string;
};

export type AbilityStat = {
  id: string;
  label: string;
  value: number;
};

export type FloatingFruit = {
  id: string;
  kind: FruitKind;
  label: string;
  bubble: string;
  emoji?: string;
  startX: number;
  startY: number;
  size: number;
  duration: number;
  delay: number;
  drift: "a" | "b" | "c";
  layer: "near" | "mid" | "far";
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
  preview: {
    src: string;
    alt: string;
  };
  characterPoseId: string;
  badges: string[];
  mindMapNodes: MindMapNode[];
};

export const siteContent = {
  siteName: "oo 的水果像素星球",
  siteNameEs: "El planeta pixel de oo",
  owner: {
    name: "oo",
    greeting: "Bienvenid@ a mi planeta",
  },
  navItems: [
    { id: "inicio", href: "#inicio", label: "首页 / Inicio" },
    { id: "memories", href: "#memories", label: "回忆 / Recuerdos" },
    { id: "works", href: "#works", label: "AI 小宇宙 / IA" },
    { id: "about", href: "#about", label: "关于 oo / Sobre oo" },
  ] satisfies NavItem[],
  hero: {
    title: "Hola, soy oo",
    planetTitle: "欢迎来到 oo 的水果像素星球",
    subtitleChinese: "这里收藏着水果、星星、AI、西语和一些闪闪发光的小日常。",
    subtitleSpanish: "Un pequeño mundo pixel lleno de frutas, recuerdos, IA y dulzura.",
    characterPoseIds: ["wave", "avocado", "coding", "reading", "dragonfruit", "pointing"],
    sticker: {
      label: "invierno",
      poseId: "ok",
    },
    statusItems: [
      { label: "Español", shortLabel: "ES" },
      { label: "IA", shortLabel: "IA" },
      { label: "Frutas", shortLabel: "FR" },
      { label: "Dulce vida", shortLabel: "♥" },
    ],
    marqueeItems: [
      "oo 的水果像素星球开门啦",
      "El planeta pixel de oo te saluda",
      "Fresas · aguacate · mango · pitaya",
      "IA pequeña, ideas brillantes",
      "杭州日常 · Español · Dulce vida",
    ],
    ctas: [
      { href: "#memories", label: "认识 oo / Conocer a oo" },
      { href: "#works", label: "查看 AI 小宇宙 / Ver proyectos" },
    ],
    scrollHintChinese: "向下滑，继续探索 ↓",
    scrollHintSpanish: "Desliza para descubrir más",
  },
  easterEgg: {
    chinese: "oo 获得了一颗火龙果星星 ✨",
    spanish: "oo ha conseguido una estrella de pitaya ✨",
    avatarPoseIds: ["dragonfruit", "cuteFace"],
  },
  floatingFruits: [
    {
      id: "fruit-dragon-1",
      kind: "dragonfruit",
      label: "火龙果",
      bubble: "🐉 pitaya!",
      startX: 8,
      startY: 26,
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
      bubble: "🥑 aguacate!",
      emoji: "🥑",
      startX: 80,
      startY: 20,
      size: 48,
      duration: 24,
      delay: -10,
      drift: "b",
      layer: "mid",
    },
    {
      id: "fruit-mango-1",
      kind: "mango",
      label: "芒果",
      bubble: "🥭 mango!",
      emoji: "🥭",
      startX: 16,
      startY: 72,
      size: 48,
      duration: 21,
      delay: -8,
      drift: "c",
      layer: "mid",
    },
    {
      id: "fruit-strawberry-1",
      kind: "strawberry",
      label: "草莓",
      bubble: "🍓 fresa!",
      emoji: "🍓",
      startX: 88,
      startY: 68,
      size: 52,
      duration: 19,
      delay: -2,
      drift: "a",
      layer: "near",
    },
    {
      id: "fruit-orange-1",
      kind: "orange",
      label: "橙子",
      bubble: "🍊 naranja!",
      emoji: "🍊",
      startX: 64,
      startY: 84,
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
      bubble: "✨ estrella!",
      emoji: "⭐",
      startX: 33,
      startY: 16,
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
      bubble: "💗 cariño!",
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
      bubble: "🌼 flor!",
      emoji: "🌼",
      startX: 8,
      startY: 50,
      size: 30,
      duration: 23,
      delay: -6,
      drift: "b",
      layer: "far",
    },
  ] satisfies FloatingFruit[],
  memorySection: {
    kicker: "Pequeños recuerdos de oo",
    title: "oo 的小小回忆册",
    description: "走过的街道、认真工作的日子和平凡生活里的小快乐，都装进这三本相册里。",
    noteChinese: "点击像素卡片，看看 oo 在西班牙、工作和生活里留下的小片段。",
    noteSpanish: "Haz clic en las tarjetas para ver las fotos.",
  },
  workSection: {
    kicker: "El pequeño universo de IA de oo",
    title: "oo 的 AI 小宇宙",
    description: "把 AI、Prompt、知识整理和一点点想象力，做成可展开探索的项目游戏卡。",
    characterPoseId: "coding",
    expandLabel: "展开 / Ver más ✨",
    collapseLabel: "收起 / Ver menos 🍓",
  },
  workCards: [
    {
      id: "ai-todo",
      title: "桌面AI待办助手",
      description: "让待办常驻桌面，自己完成优先级与时间的判断。",
      preview: {
        src: "/assets/works/desktop-ai-todo.svg",
        alt: "桌面AI待办助手界面示意：桌面常驻任务面板、AI 排期理由、任务拆解与悬浮球。",
      },
      characterPoseId: "coding",
      badges: ["产品", "AI", "Vibe coding"],
      markdown: `## 项目背景
拆解 10+ 主流 Todo 产品后发现，待办的瓶颈不在记录，而在判断。把需求收敛为「随手记录、持续可见、快速处理」，以桌面常驻小组件承载，让待办自己会判断。

## 解决的问题
- 工具来回切换，优先级只能靠人排
- 只有清单没有判断：先做哪件、要做多久、今天能否做完不清楚

## AI 功能亮点
- 自然语言建任务：提取时间、时长与分类，不确定字段保留空值
- AI 智能排期：结合剩余工作时间排出带理由的顺序，提示时间超载
- 任务拆解与估时：拆为 3-5 步，参考历史任务复用估时

## 结果展示
收起态为悬浮球，悬停显示未完成任务数并触发眨眼动效，置顶面板半透明兼顾网页窗口办公。任务从记录到排期、拆解、估时，判断交给 AI。`,
      mindMapNodes: [
        { id: "capture", label: "随手记录", angle: -90 },
        { id: "parse", label: "提取任务信息", angle: -18 },
        { id: "schedule", label: "AI 智能排期", angle: 54 },
        { id: "breakdown", label: "任务拆解估时", angle: 126 },
        { id: "desktop", label: "桌面持续可见", angle: 198 },
      ],
    },
    {
      id: "ai-weekly",
      title: "AI 周报生成器",
      description: "把零散的工作素材整理成有结论、有数据、有下一步的周报，连接飞书后自动创建并填写文档。",
      preview: {
        src: "/assets/works/ai-weekly-report.svg",
        alt: "AI 周报生成器界面示意：文字、表格和截图经 Skill 整理，输出包含核心结果、业务进展与下周重点的飞书文档。",
      },
      characterPoseId: "coding",
      badges: ["Skill", "工作流", "AI"],
      markdown: `## 项目背景
我的工作涉及团队协同、产品营销效果分析，以及线索情况统计。每周写周报，都需要重新整理线索数据、内容表现、营销进度和相关截图。

我把岗位背景、周报结构和判断标准整理成一份 Skill，让 AI 按照固定的业务口径处理素材，并通过飞书连接完成文档创建与内容写入。

## 解决的问题
- 工作素材分散在文字、表格和截图中，每周需要重新归类、整理。
- 周报容易停留在“做了什么”，看不清结果、效果和下一步。
- 数据口径、表格位置和截图归属需要反复核对，生成后还要搬到工作文档中。

## AI 能力与工具联动
- **大语言模型**：提取并归类工作素材，辅助总结业务结果与传播效果。
- **自定义 Skill**：沉淀岗位背景、周报结构、数据校验规则和表达要求。
- **飞书文档联动**：打通飞书，自动创建周报文档，并写入整理后的内容。

## Prompt 思路
先让 AI 理解我的职责和当前的问题，再把素材分别归入各板块。

写作遵循“结论先行、数据佐证、明确判断”。单线索成本、环比等派生指标需要重新计算；缺失信息标注“数据待补充”。最后检查板块完整性，将内容写入飞书文档。

## 结果展示
生成一份包含核心结果、业务进展、传播效果判断、本周问题和下周重点的飞书周报。相关表格与截图按业务板块组织，缺失信息集中列出，方便继续补充和复核。`,
      mindMapNodes: [
        { id: "input", label: "归类工作素材", angle: -90 },
        { id: "skill", label: "Skill 业务口径", angle: -18 },
        { id: "validation", label: "数据计算校验", angle: 54 },
        { id: "summary", label: "结论与下一步", angle: 126 },
        { id: "feishu", label: "写入飞书文档", angle: 198 },
      ],
    },
    {
      id: "product-popup",
      title: "产品弹窗制作",
      description: "将产品更新记录整理成酒店客户看得懂的弹窗文案，配合 ChatGPT 生成图片，完成内容与视觉素材制作。",
      preview: {
        src: "/assets/works/product-update-popup.svg",
        alt: "产品弹窗制作界面示意：产品更新记录经 Skill 核对，生成含小标题、适用版本和新增／优化分类的弹窗文案，配合 ChatGPT 图片形成素材。",
      },
      characterPoseId: "pointing",
      badges: ["Skill", "营销", "产品"],
      markdown: `## 项目背景
我的工作需要将产品更新信息转化为面向酒店客户的功能介绍。每次制作弹窗，都需要理解功能变化、核对适用版本，再把内部描述改写成客户能理解的表达，并准备配套图片。

## 解决的问题
- 产品更新记录偏内部表达，需要重新提炼客户能够感知的功能变化。
- 不同功能适用的版本不同，“新增”和“优化”也需要准确区分。
- 通用 AI 容易加入夸大宣传或未经确认的功能描述，增加审核成本。
- 每次制作都要重复解释文案结构和表达要求，输出风格不够稳定。

## AI 能力与工具联动
- **大语言模型**：理解功能描述，提炼功能变化与客户价值，将内部术语转化为客户语言。
- **自定义 Skill**：沉淀文案结构、适用版本、新增／优化分类和事实核对规则。
- **飞书多维表格联动**：在已授权且可访问的情况下，按指定日期自动爬取产品更新记录，作为文案生成依据。
- **ChatGPT 图片生成**：生成弹窗配套图片，文案输出后调用。

## Prompt 思路
先明确弹窗面向的酒店客户，以及功能描述、适用版本和更新类型，再逐条提取客户能够感知的变化。

小标题直接概括功能，正文按照“功能变化＋客户价值”组织。正式版本名称保持原样，仅为新增功能添加新增标记。

## 结果展示
输出包含小标题、适用版本和正文的标准化弹窗文案，多条功能分别呈现，便于逐条审核与排版。

配合 ChatGPT 生成的图片，形成可供后续设计、审核和发布使用的弹窗素材。`,
      mindMapNodes: [
        { id: "records", label: "获取更新记录", angle: -90 },
        { id: "verify", label: "版本与事实核对", angle: -18 },
        { id: "copy", label: "客户语言文案", angle: 54 },
        { id: "image", label: "ChatGPT 配图", angle: 126 },
        { id: "review", label: "素材审核排版", angle: 198 },
      ],
    },
  ] satisfies WorkItem[],
  aboutContent: {
    kicker: "Sobre oo",
    title: "关于 oo / Sobre oo",
    poseId: "wave",
    seasonalMiniPoseId: "smileHand",
    seasonLabels: ["Verano mode", "Invierno mode"],
    chinese:
      "我是 oo，很高兴你逛到这里。这里有我喜欢的东西、正在学的东西，也有一些还在尝试中的小想法。",
    spanish:
      "Soy oo, me alegra que hayas llegado hasta aquí. Aquí están las cosas que me gustan, las que estoy aprendiendo y algunas pequeñas ideas que todavía estoy probando.",
    tags: ["Español", "IA", "Frutas", "Hangzhou", "Dulce vida", "Curiosa", "Brillante"],
    keywordTitle: "oo 的小关键词",
    keywordTitleEs: "Palabras de oo",
    keywords: ["西语", "杭州", "AI", "水果", "咖啡", "可爱能量"],
    abilityTitle: "像素能力值",
    abilityStats: [
      { id: "curiosity", label: "Curiosidad 好奇心", value: 90 },
      { id: "sweetness", label: "Dulzura 可爱能量", value: 95 },
      { id: "spanish", label: "Español 西语能量", value: 88 },
      { id: "ai", label: "IA 探索力", value: 76 },
      { id: "fruits", label: "Frutas 喜爱值", value: 100 },
    ] satisfies AbilityStat[],
  },
  footerContent: {
    poseId: "happyMusic",
    spanish: "Hecho con amor, frutas y un poquito de IA.",
    chinese: "用爱、水果和一点点 AI 做成。",
    dedication: "Para oo, con todo mi cariño.",
    smallLine: "Un pequeño regalo pixelado para una chica brillante.",
    fruits: ["🍓", "🥑", "🥭", "🐉", "✨", "💗"],
  },
  transitions: {
    heroToMemories: {
      label: "fruit trail",
      fruits: ["🍓", "✦", "🥑", "✦", "🥭", "✦", "🐉"],
    },
    memoriesToWorks: {
      chinese: "除了可爱的日常，oo 也在慢慢建立自己的 AI 小宇宙。",
      spanish: "Además de sus recuerdos, oo también está creando su pequeño universo de IA.",
    },
    worksToAbout: {
      label: "pixel orbit",
      stars: ["✦", "✧", "✦", "✧", "✦"],
    },
  },
};
