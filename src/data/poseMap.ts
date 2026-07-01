export type Season = "summer" | "winter";

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

export const dragonAssets = {
  idle: "/assets/dragon/01_dragon_idle.png",
};

const summerPoseSet = {
  wave: {
    id: "wave",
    src: "/assets/oo-poses-7/oo_pixel_pose_01_wave.png",
    alt: "夏季像素风 oo 正在挥手",
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
    alt: "夏季像素风 oo 拿着牛油果",
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
    alt: "夏季像素风 oo 在电脑前工作",
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
    alt: "夏季像素风 oo 正在看书",
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
    alt: "夏季像素风 oo 拿着火龙果",
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
    alt: "夏季像素风 oo 指向前方",
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
    alt: "夏季像素风 oo 坐着微笑",
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
    alt: "夏季像素风 oo 开心听音乐",
    label: "dancing music",
    offsetX: "0px",
    offsetY: "8px",
    scale: 1.05,
    mood: "happy",
    usage: ["footer"],
  },
} satisfies Record<string, HeroPose>;

const winterSet = {
  peace: {
    id: "winterPeace",
    src: "/assets/oo-winter-poses/mosaic_chibi_01.png",
    alt: "冬季像素风 oo 正在比耶",
    label: "winter peace",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1.08,
    mood: "winter cute",
    usage: ["hero", "winter"],
  },
  smileHand: {
    id: "winterSmileHand",
    src: "/assets/oo-winter-poses/mosaic_chibi_02.png",
    alt: "冬季像素风 oo 托腮微笑",
    label: "winter smile hand",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1.08,
    mood: "soft winter",
    usage: ["about", "winter"],
  },
  lattePoint: {
    id: "winterLattePoint",
    src: "/assets/oo-winter-poses/mosaic_chibi_03.png",
    alt: "冬季像素风 oo 指着拿铁",
    label: "winter latte point",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1.08,
    mood: "coffee",
    usage: ["memory", "coffee", "winter"],
  },
  pointing: {
    id: "winterPointing",
    src: "/assets/oo-winter-poses/mosaic_chibi_04.png",
    alt: "冬季像素风 oo 指向前方",
    label: "winter pointing",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1.08,
    mood: "guide",
    usage: ["ai", "winter"],
  },
  doublePeace: {
    id: "winterDoublePeace",
    src: "/assets/oo-winter-poses/mosaic_chibi_05.png",
    alt: "冬季像素风 oo 双手比耶",
    label: "winter double peace",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1.08,
    mood: "bright",
    usage: ["hero", "winter"],
  },
  drinkingLatte: {
    id: "winterDrinkingLatte",
    src: "/assets/oo-winter-poses/mosaic_chibi_06.png",
    alt: "冬季像素风 oo 正在喝咖啡",
    label: "winter drinking latte",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1.08,
    mood: "cafecito",
    usage: ["memory", "coffee", "winter"],
  },
  cuteFace: {
    id: "winterCuteFace",
    src: "/assets/oo-winter-poses/mosaic_chibi_07.png",
    alt: "冬季像素风 oo 露出可爱表情",
    label: "winter cute face",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1.08,
    mood: "cute",
    usage: ["footer", "easterEgg", "winter"],
  },
  ok: {
    id: "winterOk",
    src: "/assets/oo-winter-poses/mosaic_chibi_08.png",
    alt: "冬季像素风 oo 做 OK 手势",
    label: "winter ok",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1.08,
    mood: "ok",
    usage: ["hero", "winter"],
  },
  happyMusic: {
    id: "winterHappyMusic",
    src: "/assets/oo-winter-poses/mosaic_chibi_09.png",
    alt: "冬季像素风 oo 开心听音乐",
    label: "winter happy music",
    offsetX: "0px",
    offsetY: "0px",
    scale: 1.08,
    mood: "music",
    usage: ["footer", "winter"],
  },
} satisfies Record<string, HeroPose>;

export const ooPoseSets: Record<Season, Record<string, HeroPose>> = {
  summer: summerPoseSet,
  winter: winterSet,
};
