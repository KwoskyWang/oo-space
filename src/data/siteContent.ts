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

export type PoseUsage =
  | "hero"
  | "memory"
  | "ai"
  | "about"
  | "footer"
  | "easterEgg"
  | "coffee"
  | "winter";

export type HeroPose = {
  id: string;
  src: string;
  alt: string;
  label: string;
  offsetX?: string;
  offsetY?: string;
  scale?: number;
  fallbackSrc?: string;
  mood?: string;
  usage?: PoseUsage[];
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

export type MemoryTheme = "spain" | "hangzhou" | "fruit" | "work" | "weekend" | "coffee";

export type MemoryCard = {
  id: string;
  type: "image" | "video";
  title: string;
  subtitleEs: string;
  description: string;
  quoteEs: string;
  dateLabel: string;
  tags: string[];
  sticker: string;
  placeholderTheme: MemoryTheme;
  avatarPoseId?: keyof typeof ooPoses;
  assetUrl?: string;
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
  characterPoseId: keyof typeof ooPoses;
  badges: string[];
  note: {
    title: string;
    chinese: string;
    spanish: string;
  };
  mindMapNodes: MindMapNode[];
};

const summerPoseSet = {
  wave: {
    id: "wave",
    src: "/assets/oo-poses-7/oo_pixel_pose_01_wave.png",
    alt: "oo 挥手",
    label: "wave",
    offsetX: "0px",
    offsetY: "8px",
    scale: 1.08,
    mood: "hello",
    usage: ["hero", "about"],
  },
  avocado: {
    id: "avocado",
    src: "/assets/oo-poses-7/oo_pixel_pose_02_avocado.png",
    alt: "oo 拿着牛油果",
    label: "avocado",
    offsetX: "0px",
    offsetY: "8px",
    scale: 1.08,
    mood: "fruit",
    usage: ["footer", "hero"],
  },
  coding: {
    id: "coding",
    src: "/assets/oo-poses-7/oo_pixel_pose_03_coding_laptop.png",
    alt: "oo 在电脑前工作",
    label: "coding",
    offsetX: "0px",
    offsetY: "10px",
    scale: 1.07,
    mood: "focused",
    usage: ["ai"],
  },
  reading: {
    id: "reading",
    src: "/assets/oo-poses-7/oo_pixel_pose_04_reading.png",
    alt: "oo 看书",
    label: "reading",
    offsetX: "0px",
    offsetY: "8px",
    scale: 1.08,
    mood: "study",
    usage: ["ai"],
  },
  dragonfruit: {
    id: "dragonfruit",
    src: "/assets/oo-poses-7/oo_pixel_pose_06_dragonfruit.png",
    alt: "oo 拿着火龙果",
    label: "dragonfruit",
    offsetX: "0px",
    offsetY: "9px",
    scale: 1.08,
    mood: "fruit",
    usage: ["hero", "easterEgg"],
  },
  pointing: {
    id: "pointing",
    src: "/assets/oo-poses-7/oo_pixel_pose_07_pointing.png",
    alt: "oo 指向前方",
    label: "pointing",
    offsetX: "0px",
    offsetY: "8px",
    scale: 1.08,
    mood: "guide",
    usage: ["ai"],
  },
  sittingSmile: {
    id: "sittingSmile",
    src: "/assets/oo-poses/oo-pose-03.png",
    alt: "oo 坐着微笑",
    label: "sitting smile",
    offsetX: "0px",
    offsetY: "6px",
    scale: 1.04,
    mood: "soft",
    usage: ["about"],
  },
  dancingMusic: {
    id: "dancingMusic",
    src: "/assets/oo-poses/oo-pose-09.png",
    alt: "oo 开心听音乐",
    label: "dancing music",
    offsetX: "0px",
    offsetY: "8px",
    scale: 1.05,
    mood: "happy",
    usage: ["footer"],
  },
} satisfies Record<string, HeroPose>;

const winterFallback = "/assets/oo-poses/oo-pose-03.png";

const winterPoseSet = {
  winterPeace: {
    id: "winterPeace",
    src: "/assets/oo-winter-poses/oo_winter_pose_01_peace.png",
    fallbackSrc: "/assets/oo-poses/oo-pose-01.png",
    alt: "冬季 oo 比耶",
    label: "winter peace",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1,
    mood: "winter cute",
    usage: ["hero", "winter"],
  },
  winterSmileHand: {
    id: "winterSmileHand",
    src: "/assets/oo-winter-poses/oo_winter_pose_02_smile_hand.png",
    fallbackSrc: "/assets/oo-poses/oo-pose-02.png",
    alt: "冬季 oo 托腮微笑",
    label: "winter smile hand",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1,
    mood: "soft winter",
    usage: ["about", "winter"],
  },
  winterLattePoint: {
    id: "winterLattePoint",
    src: "/assets/oo-winter-poses/oo_winter_pose_03_latte_point.png",
    fallbackSrc: "/assets/oo-poses/oo-pose-03.png",
    alt: "冬季 oo 指着拿铁",
    label: "winter latte point",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1,
    mood: "coffee",
    usage: ["memory", "coffee", "winter"],
  },
  winterPointing: {
    id: "winterPointing",
    src: "/assets/oo-winter-poses/oo_winter_pose_04_pointing.png",
    fallbackSrc: "/assets/oo-poses/oo-pose-04.png",
    alt: "冬季 oo 指向前方",
    label: "winter pointing",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1,
    mood: "guide",
    usage: ["ai", "winter"],
  },
  winterDoublePeace: {
    id: "winterDoublePeace",
    src: "/assets/oo-winter-poses/oo_winter_pose_05_double_peace.png",
    fallbackSrc: "/assets/oo-poses/oo-pose-05.png",
    alt: "冬季 oo 双手比耶",
    label: "winter double peace",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1,
    mood: "bright",
    usage: ["hero", "winter"],
  },
  winterDrinkingLatte: {
    id: "winterDrinkingLatte",
    src: "/assets/oo-winter-poses/oo_winter_pose_06_drinking_latte.png",
    fallbackSrc: "/assets/oo-poses/oo-pose-06.png",
    alt: "冬季 oo 喝拿铁",
    label: "winter drinking latte",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1,
    mood: "cafecito",
    usage: ["memory", "coffee", "winter"],
  },
  winterCuteFace: {
    id: "winterCuteFace",
    src: "/assets/oo-winter-poses/oo_winter_pose_07_cute_face.png",
    fallbackSrc: "/assets/oo-poses/oo-pose-07.png",
    alt: "冬季 oo 可爱表情",
    label: "winter cute face",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1,
    mood: "cute",
    usage: ["footer", "easterEgg", "winter"],
  },
  winterOk: {
    id: "winterOk",
    src: "/assets/oo-winter-poses/oo_winter_pose_08_ok.png",
    fallbackSrc: "/assets/oo-poses/oo-pose-08.png",
    alt: "冬季 oo OK 手势",
    label: "winter ok",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1,
    mood: "ok",
    usage: ["hero", "winter"],
  },
  winterHappyMusic: {
    id: "winterHappyMusic",
    src: "/assets/oo-winter-poses/oo_winter_pose_09_happy_music.png",
    fallbackSrc: winterFallback,
    alt: "冬季 oo 开心听音乐",
    label: "winter happy music",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1,
    mood: "music",
    usage: ["footer", "winter"],
  },
} satisfies Record<string, HeroPose>;

export const ooPoseSets: {
  summer: Record<string, HeroPose>;
  winter: Record<string, HeroPose>;
} = {
  summer: summerPoseSet,
  winter: winterPoseSet,
};

export const ooPoses: Record<string, HeroPose> = {
  ...summerPoseSet,
  ...winterPoseSet,
};

export const siteContent = {
  siteName: "oo 的水果像素星球",
  siteNameEs: "El planeta pixel de oo",
  owner: {
    name: "oo",
    greeting: "Bienvenid@ a mi planeta",
  },
  ooPoses,
  ooPoseSets,
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
    characterPoses: [
      ooPoses.wave,
      ooPoses.avocado,
      ooPoses.coding,
      ooPoses.reading,
      ooPoses.dragonfruit,
      ooPoses.pointing,
    ] satisfies HeroPose[],
    sticker: {
      label: "invierno",
      poseId: "winterOk" as keyof typeof ooPoses,
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
    avatarPoseIds: ["dragonfruit", "winterCuteFace"] as Array<keyof typeof ooPoses>,
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
    description: "这些位置先用像素占位保存，之后可以换成真实照片和视频。",
    noteChinese: "这些像素卡片先保存回忆的位置，之后可以换成真实照片和视频。",
    noteSpanish: "Estos espacios esperan tus fotos y vídeos reales.",
  },
  memoryCards: [
    {
      id: "spain-sun",
      type: "image",
      title: "在西班牙的阳光里",
      subtitleEs: "Sol de España",
      description: "午后的街角、明亮的墙面和慢慢变金色的天空，都是 oo 的西语记忆。",
      quoteEs: "Un pedacito de sol español.",
      dateLabel: "España · 2023",
      tags: ["España", "Recuerdos", "Viaje"],
      sticker: "☀️",
      placeholderTheme: "spain",
    },
    {
      id: "hangzhou-days",
      type: "image",
      title: "杭州的日常",
      subtitleEs: "Días en Hangzhou",
      description: "下班路上的风、咖啡店里的光和认真生活的每一天，组成了现在的 oo。",
      quoteEs: "La vida cotidiana también brilla.",
      dateLabel: "Hangzhou · Now",
      tags: ["Hangzhou", "Pequeños momentos"],
      sticker: "🥑",
      placeholderTheme: "hangzhou",
    },
    {
      id: "fruit-planet",
      type: "video",
      title: "可爱的水果星球",
      subtitleEs: "Planeta de frutas",
      description: "一个留给真实视频的位置：可以放水果、旅行、vlog，或者 oo 的可爱瞬间。",
      quoteEs: "Dulce vida, dulce planeta.",
      dateLabel: "Momentos · Video",
      tags: ["Dulce vida", "Momentos"],
      sticker: "🍓",
      placeholderTheme: "fruit",
    },
    {
      id: "work-oo",
      type: "image",
      title: "努力工作的 oo",
      subtitleEs: "Ideas claras",
      description: "在杭州认真发光，处理任务、学习新工具，也悄悄把生活变得更有秩序。",
      quoteEs: "Trabajar con calma y corazón.",
      dateLabel: "Hangzhou · Work",
      tags: ["Hangzhou", "IA", "Brillante"],
      sticker: "✨",
      placeholderTheme: "work",
    },
    {
      id: "weekend-happy",
      type: "image",
      title: "周末的小快乐",
      subtitleEs: "Pequeñas alegrías",
      description: "甜品、散步、电影和一点点发呆，是给一周充电的小小魔法。",
      quoteEs: "Pequeñas alegrías del finde.",
      dateLabel: "Weekend · Comida",
      tags: ["Comida", "Pequeños momentos"],
      sticker: "💌",
      placeholderTheme: "weekend",
    },
    {
      id: "coffee-winter",
      type: "image",
      title: "咖啡和冬天",
      subtitleEs: "Café de invierno",
      description: "一杯热咖啡、一点暖灯和柔软外套，把冷天也变成可以收藏的小片段。",
      quoteEs: "Un cafecito caliente para un día suave.",
      dateLabel: "Winter · Café",
      tags: ["Café", "Invierno", "Dulce vida", "Cafecito"],
      sticker: "☕",
      placeholderTheme: "coffee",
      avatarPoseId: "winterDrinkingLatte",
    },
  ] satisfies MemoryCard[],
  workSection: {
    kicker: "El pequeño universo de IA de oo",
    title: "oo 的 AI 小宇宙",
    description: "把 AI、Prompt、知识整理和一点点想象力，做成可展开探索的项目游戏卡。",
    characterPoseId: "coding" as keyof typeof ooPoses,
    expandLabel: "展开 / Ver más ✨",
    collapseLabel: "收起 / Ver menos 🍓",
  },
  workCards: [
    {
      id: "ai-weekly",
      title: "AI 周报生成器",
      description: "把零散工作记录整理成一份清晰、有重点、适合复盘的双语周报。",
      mediaPalette: "weekly",
      characterPoseId: "coding",
      badges: ["MVP", "Vibe coding", "Prompt", "IA"],
      note: {
        title: "oo 的小结 / Nota de oo",
        chinese: "这个小项目的意义不是替代人，而是把重复的整理工作交给 AI，让自己多一点时间去思考。",
        spanish: "La IA no reemplaza la ternura; solo ayuda a ordenar mejor las ideas.",
      },
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
      characterPoseId: "reading",
      badges: ["Prompt", "Español", "Vibe coding", "IA"],
      note: {
        title: "oo 的小结 / Nota de oo",
        chinese: "西语学习最可爱的地方，是把每个句子都变成能靠近真实生活的小桥。",
        spanish: "Aprender español también puede sentirse como abrir una ventanita nueva al mundo.",
      },
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
      characterPoseId: "pointing",
      badges: ["MVP", "Knowledge", "IA", "Vibe coding"],
      note: {
        title: "oo 的小结 / Nota de oo",
        chinese: "好的知识库像一盏小灯，帮人更快找到答案，也让回复保持温柔和清楚。",
        spanish: "Una buena base de conocimiento ordena el caos y deja espacio para responder con calma.",
      },
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
  aboutContent: {
    kicker: "Sobre oo",
    title: "关于 oo / Sobre oo",
    poseId: "wave" as keyof typeof ooPoses,
    winterMiniPoseId: "winterSmileHand" as keyof typeof ooPoses,
    seasonLabels: ["Verano mode", "Invierno mode"],
    chinese:
      "oo 是一个可爱、好奇、温柔又闪闪发光的小姑娘。她学西语，喜欢探索新的东西，也正在慢慢把 AI 变成自己的小工具箱。",
    spanish:
      "oo es una chica dulce, curiosa y brillante. Le encanta aprender, crear y descubrir pequeños mundos nuevos.",
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
    poseId: "winterHappyMusic" as keyof typeof ooPoses,
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
