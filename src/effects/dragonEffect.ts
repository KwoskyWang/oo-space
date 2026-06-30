export type DragonEffectAssets = {
  dragonFrames: string[];
  starSprites: string[];
};

export type DragonEffectOptions = {
  assetBasePath?: string;
  assets?: DragonEffectAssets;
  containerSelector?: string;
  triggerSelector?: string;
};

type Particle = {
  alpha: number;
  image?: HTMLImageElement;
  life: number;
  maxLife: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  sparkle: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

const DEFAULT_ASSET_BASE = "/assets/dragon";

export const dragonEffectAssets: DragonEffectAssets = {
  dragonFrames: [
    `${DEFAULT_ASSET_BASE}/01_dragon_idle.png`,
  ],
  starSprites: [
    `${DEFAULT_ASSET_BASE}/stars/08_star_cluster_01.png`,
    `${DEFAULT_ASSET_BASE}/stars/09_star_cluster_02.png`,
    `${DEFAULT_ASSET_BASE}/stars/10_star_cluster_03.png`,
    `${DEFAULT_ASSET_BASE}/stars/11_star_cluster_04.png`,
    `${DEFAULT_ASSET_BASE}/stars/12_star_cluster_05.png`,
    `${DEFAULT_ASSET_BASE}/stars/13_star_cluster_06.png`,
    `${DEFAULT_ASSET_BASE}/stars/14_star_cluster_07.png`,
    `${DEFAULT_ASSET_BASE}/stars/15_star_cluster_08.png`,
  ],
};

let activeCleanup: (() => void) | null = null;
const imageCache = new Map<string, HTMLImageElement>();

function loadImage(src: string) {
  if (imageCache.has(src)) return imageCache.get(src);

  const image = new Image();
  image.src = src;
  imageCache.set(src, image);
  return image;
}

function resolveAssets(options?: DragonEffectOptions) {
  if (options?.assets) return options.assets;
  if (!options?.assetBasePath) return dragonEffectAssets;

  const base = options.assetBasePath.replace(/\/$/, "");
  return {
    dragonFrames: dragonEffectAssets.dragonFrames.map((src) => src.replace(DEFAULT_ASSET_BASE, base)),
    starSprites: dragonEffectAssets.starSprites.map((src) => src.replace(DEFAULT_ASSET_BASE, base)),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getOrigin(targetElement: Element) {
  const rect = targetElement.getBoundingClientRect();
  const dragonWidth = 132;
  const dragonHeight = 120;
  const gap = 20;

  let left = rect.right + gap;
  let top = rect.top + rect.height * 0.24 - dragonHeight * 0.5;

  if (left + dragonWidth > window.innerWidth - 12) {
    left = rect.left - dragonWidth - gap;
  }

  left = clamp(left, 12, window.innerWidth - dragonWidth - 12);
  top = clamp(top, 76, window.innerHeight - dragonHeight - 12);

  return { dragonHeight, dragonWidth, left, top };
}

function createParticle(originX: number, originY: number, sprites: HTMLImageElement[], burst = false): Particle {
  const angle = (-26 + Math.random() * 52) * (Math.PI / 180);
  const speed = (burst ? 3.8 : 2.1) + Math.random() * (burst ? 4.5 : 3.2);
  const life = 42 + Math.random() * 34;

  return {
    alpha: 0.82 + Math.random() * 0.18,
    image: sprites.length ? sprites[Math.floor(Math.random() * sprites.length)] : undefined,
    life,
    maxLife: life,
    rotation: Math.random() * Math.PI,
    rotationSpeed: -0.12 + Math.random() * 0.24,
    size: (burst ? 14 : 9) + Math.random() * (burst ? 22 : 16),
    sparkle: Math.random() * Math.PI * 2,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 0.5,
    x: originX + Math.random() * 8,
    y: originY + (Math.random() - 0.5) * 18,
  };
}

function drawFallbackStar(ctx: CanvasRenderingContext2D, particle: Particle) {
  const spikes = 4;
  const outer = particle.size * 0.5;
  const inner = outer * 0.42;

  ctx.beginPath();
  for (let i = 0; i < spikes * 2; i += 1) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = -Math.PI / 2 + (i * Math.PI) / spikes;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = Math.random() > 0.44 ? "#fff7cf" : "#ffc857";
  ctx.fill();
}

export function showDragonEffect(targetElement: Element, options?: DragonEffectOptions) {
  if (typeof window === "undefined") return;

  activeCleanup?.();
  activeCleanup = null;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const assets = resolveAssets(options);
  const container = options?.containerSelector
    ? document.querySelector(options.containerSelector)
    : document.body;

  if (!container) return;

  const overlay = document.createElement("div");
  overlay.className = "dragon-effect";
  overlay.setAttribute("aria-hidden", "true");

  const dragon = document.createElement("img");
  dragon.className = "dragon-effect__dragon";
  dragon.alt = "";
  dragon.src = assets.dragonFrames[0];
  overlay.appendChild(dragon);

  const canvas = document.createElement("canvas");
  canvas.className = "dragon-effect__canvas";
  overlay.appendChild(canvas);
  container.appendChild(overlay);

  const { dragonHeight, dragonWidth, left, top } = getOrigin(targetElement);
  const canvasWidth = reduceMotion ? 180 : 360;
  const canvasHeight = reduceMotion ? 120 : 220;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const ctx = canvas.getContext("2d");

  overlay.style.left = `${left}px`;
  overlay.style.top = `${top}px`;
  overlay.style.width = `${Math.max(dragonWidth, canvasWidth)}px`;
  overlay.style.height = `${Math.max(dragonHeight, canvasHeight)}px`;

  dragon.style.width = `${dragonWidth}px`;
  dragon.style.height = `${dragonHeight}px`;

  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  canvas.style.left = `${Math.min(dragonWidth * 0.7, 102)}px`;
  canvas.style.top = `${Math.max(dragonHeight * 0.03, 4)}px`;

  if (ctx) {
    ctx.scale(dpr, dpr);
  }

  const starImages = assets.starSprites.map((src) => loadImage(src)).filter(Boolean) as HTMLImageElement[];
  const particles: Particle[] = [];
  let rafId = 0;
  let stopped = false;
  const startedAt = performance.now();
  const duration = reduceMotion ? 950 : 2300;

  loadImage(assets.dragonFrames[0]);

  function cleanup() {
    stopped = true;
    window.cancelAnimationFrame(rafId);
    overlay.remove();
    if (activeCleanup === cleanup) activeCleanup = null;
  }

  function tick(now: number) {
    if (stopped || !ctx) return;

    const elapsed = now - startedAt;
    dragon.src = assets.dragonFrames[0];

    if (!reduceMotion && elapsed > 280 && elapsed < 1580) {
      const burst = elapsed > 680 && elapsed < 1100;
      const count = burst ? 5 : 3;
      for (let i = 0; i < count; i += 1) {
        particles.push(createParticle(36, canvasHeight * 0.28, starImages, burst));
      }
    } else if (reduceMotion && elapsed < 180) {
      particles.push(createParticle(34, canvasHeight * 0.28, starImages, true));
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const particle = particles[i];
      particle.life -= 1;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.045;
      particle.rotation += particle.rotationSpeed;
      particle.sparkle += 0.42;

      const lifeRatio = Math.max(particle.life / particle.maxLife, 0);
      const flicker = 0.52 + Math.abs(Math.sin(particle.sparkle)) * 0.48;
      const alpha = particle.alpha * lifeRatio * flicker;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);

      if (particle.image?.complete && particle.image.naturalWidth > 0) {
        ctx.drawImage(
          particle.image,
          -particle.size * 0.5,
          -particle.size * 0.5,
          particle.size,
          particle.size,
        );
      } else {
        drawFallbackStar(ctx, particle);
      }

      ctx.restore();

      if (particle.life <= 0 || particle.x > canvasWidth + 60 || particle.y > canvasHeight + 60) {
        particles.splice(i, 1);
      }
    }

    if (elapsed > duration) {
      overlay.classList.add("is-leaving");
    }

    if (elapsed > duration + 380) {
      cleanup();
      return;
    }

    rafId = window.requestAnimationFrame(tick);
  }

  activeCleanup = cleanup;
  rafId = window.requestAnimationFrame(tick);
}

export function initDragonEffect(options: DragonEffectOptions = {}) {
  const selector = options.triggerSelector;
  if (!selector) return () => undefined;

  const handleClick = (event: Event) => {
    const target = event.target instanceof Element ? event.target.closest(selector) : null;
    if (target) {
      showDragonEffect(target, options);
    }
  };

  document.addEventListener("click", handleClick);
  return () => document.removeEventListener("click", handleClick);
}
