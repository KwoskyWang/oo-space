export type Album = {
  id: "spain" | "work" | "life";
  title: string;
  label: string;
  date: string;
  sticker: string;
  description: string;
  quote: string;
  tags: string[];
  // 封面图在卡片上的裁切焦点（object-position）
  position: string;
  cover: string;
  photos: string[];
};

export const albums: Album[] = [
  {
    id: "spain",
    title: "🇪🇸 西班牙时光机",
    label: "Sol de España",
    date: "España · 2025",
    sticker: "☀️",
    description: "走过的街道、晒过的太阳，都是我在西班牙留下的小小片段。",
    quote: "Un pedacito de sol español.",
    tags: ["España", "Recuerdos", "Viaje"],
    position: "50% 83%",
    cover: "/assets/memories/cover/spain.jpg",
    photos: Array.from(
      { length: 10 },
      (_, i) => `/assets/memories/spain/spain${String(i + 1).padStart(2, "0")}.jpg`,
    ),
  },
  {
    id: "work",
    title: "📷 工作瞬间",
    label: "Días en Hangzhou",
    date: "Hangzhou · Work",
    sticker: "🥑",
    description: "认真工作的日子、碰撞出灵感的瞬间，还有每一次小小的成长，都收藏在这里。",
    quote: "Trabajar con calma y corazón.",
    tags: ["Hangzhou", "Trabajo", "IA"],
    position: "50% 52%",
    cover: "/assets/memories/cover/work.jpg",
    photos: Array.from(
      { length: 6 },
      (_, i) => `/assets/memories/work/work${String(i + 1).padStart(2, "0")}.jpg`,
    ),
  },
  {
    id: "life",
    title: "🤪 生活日记",
    label: "Dulce vida",
    date: "Momentos · Vida",
    sticker: "💫",
    description: "散步、旅行、发呆和突如其来的小快乐，把平凡日子过成值得收藏的片段。",
    quote: "La vida cotidiana también brilla.",
    tags: ["Dulce vida", "Momentos"],
    position: "50% 44%",
    cover: "/assets/memories/cover/life.jpg",
    photos: Array.from(
      { length: 11 },
      (_, i) => `/assets/memories/life/life${String(i + 1).padStart(2, "0")}.jpg`,
    ),
  },
];
