#!/usr/bin/env node
/**
 * Perf-24: 将 public/assets/ 下的 PNG 图片批量转换为 WebP 格式
 * 用法: node scripts/convert-to-webp.mjs
 * 前置: npm install sharp --save-dev
 */
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const ASSETS_DIR = new URL("../public/assets/", import.meta.url);
const OUTPUT_DIR = new URL("../public/assets/webp/", import.meta.url);

async function collectPNGs(dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = new URL(entry.name, dir);
    if (entry.isDirectory()) {
      results.push(...(await collectPNGs(fullPath)));
    } else if (extname(entry.name).toLowerCase() === ".png") {
      results.push({ name: entry.name, path: fullPath });
    }
  }
  return results;
}

async function convert() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error("❌ sharp 未安装，请运行: npm install sharp --save-dev");
    process.exit(1);
  }

  const pngs = await collectPNGs(ASSETS_DIR);
  console.log(`找到 ${pngs.length} 张 PNG 图片，开始转换…`);

  let saved = 0;
  for (const png of pngs) {
    const input = await readFile(new URL(png.path));
    const webpBuf = await sharp(input).webp({ quality: 82, effort: 4 }).toBuffer();
    const outName = basename(png.name, ".png") + ".webp";
    const outPath = new URL(outName, OUTPUT_DIR);
    await writeFile(new URL(outPath.pathname, import.meta.url), webpBuf);
    saved += input.length - webpBuf.length;
    console.log(`  ✓ ${png.name} → ${outName}  (${Math.round(saved / 1024)}KB saved)`);
  }

  console.log(`\n✅ 完成！共节省 ${Math.round(saved / 1024)}KB`);
}

convert().catch(console.error);
