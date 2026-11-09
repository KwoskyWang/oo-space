import type { Season } from "./poseMap";

export type DecorItem = {
  id: string;
  symbol: string;
  label: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  layer: "near" | "mid" | "far";
};

export type SeasonalContent = {
  seasonLabel: string;
  hero: {
    title: string;
    planetTitle: string;
    subtitleChinese: string;
    subtitleSpanish: string;
    characterPoseIds: string[];
    sticker: {
      label: string;
      poseId: string;
    };
    statusItems: {
      label: string;
      shortLabel: string;
    }[];
    marqueeItems: string[];
    scrollHintChinese: string;
    scrollHintSpanish: string;
    dragonMode: Season;
  };
  memorySection: {
    kicker: string;
    title: string;
    description: string;
    noteChinese: string;
    noteSpanish: string;
  };
  workSection: {
    kicker: string;
    title: string;
    description: string;
    characterPoseId: string;
    projectPoseIds: Record<string, string>;
  };
  aboutContent: {
    kicker: string;
    title: string;
    poseId: string;
    seasonalMiniPoseId: string;
    seasonLabels: string[];
    chinese: string;
    spanish: string;
    tags: string[];
    keywordTitle: string;
    keywordTitleEs: string;
    keywords: string[];
    abilityTitle: string;
  };
  footerContent: {
    poseId: string;
    stamp: string;
    spanish: string;
    chinese: string;
    dedication: string;
    smallLine: string;
    fruits: string[];
  };
  decorItems: DecorItem[];
};

const summerDecor: DecorItem[] = [
  { id: "summer-pitaya", symbol: "🐉", label: "pitaya", x: 8, y: 26, size: 58, delay: -4, duration: 18, layer: "near" },
  { id: "summer-avocado", symbol: "🥑", label: "aguacate", x: 80, y: 20, size: 48, delay: -10, duration: 24, layer: "mid" },
  { id: "summer-mango", symbol: "🥭", label: "mango", x: 16, y: 72, size: 48, delay: -8, duration: 21, layer: "mid" },
  { id: "summer-strawberry", symbol: "🍓", label: "fresa", x: 88, y: 68, size: 52, delay: -2, duration: 19, layer: "near" },
  { id: "summer-star", symbol: "⭐", label: "estrella", x: 33, y: 16, size: 24, delay: -3, duration: 16, layer: "far" },
  { id: "summer-heart", symbol: "💗", label: "cariño", x: 72, y: 46, size: 28, delay: -11, duration: 17, layer: "mid" },
];

const winterDecor: DecorItem[] = [
  { id: "winter-snow-1", symbol: "❄", label: "nieve", x: 10, y: 14, size: 34, delay: -2, duration: 15, layer: "far" },
  { id: "winter-coffee", symbol: "☕", label: "cafecito", x: 82, y: 22, size: 42, delay: -6, duration: 20, layer: "mid" },
  { id: "winter-snowman", symbol: "☃", label: "muñeco", x: 15, y: 74, size: 44, delay: -4, duration: 24, layer: "mid" },
  { id: "winter-scarf", symbol: "🧣", label: "bufanda", x: 87, y: 68, size: 38, delay: -10, duration: 21, layer: "near" },
  { id: "winter-wind", symbol: "〜", label: "viento", x: 36, y: 20, size: 34, delay: -8, duration: 18, layer: "far" },
  { id: "winter-ice", symbol: "◇", label: "cristal", x: 67, y: 82, size: 26, delay: -12, duration: 17, layer: "far" },
  { id: "winter-lamp", symbol: "✹", label: "lámpara", x: 54, y: 38, size: 30, delay: -1, duration: 22, layer: "mid" },
];

export const seasonContent: Record<Season, SeasonalContent> = {
  summer: {
    seasonLabel: "Verano",
    hero: {
      title: "Hola, soy oo",
      planetTitle: "欢迎来到 oo 的水果像素星球",
      subtitleChinese: "这里收藏着水果、星星、AI、西语和一些闪闪发光的小日常。",
      subtitleSpanish: "Un pequeño mundo pixel lleno de frutas, recuerdos, IA y dulzura.",
      characterPoseIds: ["wave", "avocado", "coding", "reading", "dragonfruit", "pointing"],
      sticker: {
        label: "mini oo",
        poseId: "avocado",
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
      scrollHintChinese: "向下滑，继续探索！",
      scrollHintSpanish: "Desliza para descubrir más",
      dragonMode: "summer",
    },
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
      projectPoseIds: {
        "ai-todo": "coding",
        "ai-weekly": "coding",
        "product-popup": "pointing",
      },
    },
    aboutContent: {
      kicker: "Sobre oo",
      title: "关于 oo / Sobre oo",
      poseId: "wave",
      seasonalMiniPoseId: "sittingSmile",
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
    },
    footerContent: {
      poseId: "dancingMusic",
      stamp: "💌",
      spanish: "Hecho con amor, frutas y un poquito de IA.",
      chinese: "用爱、水果和一点点 AI 做成。",
      dedication: "Para oo, con todo mi cariño.",
      smallLine: "Un pequeño regalo pixelado para una chica brillante.",
      fruits: ["🍓", "🥑", "🥭", "🐉", "✨", "💗"],
    },
    decorItems: summerDecor,
  },
  winter: {
    seasonLabel: "Invierno",
    hero: {
      title: "Hola, soy oo",
      planetTitle: "欢迎来到 oo 的冬日像素星球",
      subtitleChinese: "这里变成了有咖啡、雪花、暖灯和一点点 AI 的冬日小世界。",
      subtitleSpanish: "Un pequeño invierno pixelado con café, nieve y dulzura.",
      characterPoseIds: ["doublePeace", "cuteFace", "drinkingLatte", "ok"],
      sticker: {
        label: "cafecito",
        poseId: "ok",
      },
      statusItems: [
        { label: "Español", shortLabel: "ES" },
        { label: "IA", shortLabel: "IA" },
        { label: "Cafecito", shortLabel: "CF" },
        { label: "Invierno", shortLabel: "❄" },
      ],
      marqueeItems: [
        "Bienvenido al invierno pixel de oo",
        "cafecito caliente",
        "nieve suave",
        "muñeco de nieve",
        "IA pequeña",
        "dulzura",
        "invierno brillante",
        "hecho con cariño",
      ],
      scrollHintChinese: "向下滑，继续探索！",
      scrollHintSpanish: "Desliza para descubrir más",
      dragonMode: "winter",
    },
    memorySection: {
      kicker: "Recuerdos de invierno de oo",
      title: "oo 的冬日回忆册",
      description: "走过的街道、认真工作的日子和平凡生活里的小快乐，都装进这三本相册里。",
      noteChinese: "点击像素卡片，看看 oo 在西班牙、工作和生活里留下的小片段。",
      noteSpanish: "Haz clic en las tarjetas para ver las fotos.",
    },
    workSection: {
      kicker: "El pequeño universo de IA de oo",
      title: "oo 的 AI 小宇宙",
      description: "冬天的 AI 小宇宙像一扇暖窗，把想法、Prompt 和知识整理得更清楚。",
      characterPoseId: "drinkingLatte",
      projectPoseIds: {
        "ai-todo": "doublePeace",
        "ai-weekly": "ok",
        "product-popup": "lattePoint",
      },
    },
    aboutContent: {
      kicker: "Sobre oo",
      title: "关于 oo / Sobre oo",
      poseId: "cuteFace",
      seasonalMiniPoseId: "smileHand",
      seasonLabels: ["Invierno mode", "Verano mode"],
      chinese:
        "我是 oo，很高兴你逛到这里。这里有我喜欢的东西、正在学的东西，也有一些还在尝试中的小想法。",
      spanish:
        "Soy oo, me alegra que hayas llegado hasta aquí. Aquí están las cosas que me gustan, las que estoy aprendiendo y algunas pequeñas ideas que todavía estoy probando.",
      tags: ["Español", "IA", "Cafecito", "Invierno", "Dulce vida", "Brillante"],
      keywordTitle: "oo 的冬日关键词",
      keywordTitleEs: "Palabras de invierno",
      keywords: ["西语", "AI", "咖啡", "雪花", "暖灯", "冬日能量"],
      abilityTitle: "冬日像素能力值",
    },
    footerContent: {
      poseId: "happyMusic",
      stamp: "❄",
      spanish: "Hecho con amor, café y un poquito de IA.",
      chinese: "用爱、咖啡和一点点 AI 做成。",
      dedication: "Para oo, con todo mi cariño.",
      smallLine: "Un pequeño regalo pixelado para una chica brillante.",
      fruits: ["❄", "☕", "⭐", "🧣", "☃", "💙"],
    },
    decorItems: winterDecor,
  },
};
