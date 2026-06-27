import { deflateSync, inflateSync } from "node:zlib";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const [, , sourcePath, outputDir = "public/assets/oo-poses"] = process.argv;

if (!sourcePath) {
  throw new Error("Usage: node scripts/crop-oo-grid.mjs <source.png> [outputDir]");
}

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const bytes = readFileSync(sourcePath);

if (!bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error(`${basename(sourcePath)} is not a PNG file.`);
}

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n += 1) {
  let c = n;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function crc32(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) {
    c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data = Buffer.alloc(0)) {
  const typeBuffer = Buffer.from(type, "ascii");
  const chunk = Buffer.alloc(8 + data.length + 4);
  chunk.writeUInt32BE(data.length, 0);
  typeBuffer.copy(chunk, 4);
  data.copy(chunk, 8);
  chunk.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 8 + data.length);
  return chunk;
}

let offset = 8;
let width = 0;
let height = 0;
let bitDepth = 0;
let colorType = 0;
let interlace = 0;
const idatChunks = [];

while (offset < bytes.length) {
  const length = bytes.readUInt32BE(offset);
  const type = bytes.toString("ascii", offset + 4, offset + 8);
  const data = bytes.subarray(offset + 8, offset + 8 + length);

  if (type === "IHDR") {
    width = data.readUInt32BE(0);
    height = data.readUInt32BE(4);
    bitDepth = data[8];
    colorType = data[9];
    interlace = data[12];
  }

  if (type === "IDAT") {
    idatChunks.push(data);
  }

  if (type === "IEND") {
    break;
  }

  offset += length + 12;
}

if (width !== 1024 || height !== 1024 || bitDepth !== 8 || colorType !== 6 || interlace !== 0) {
  throw new Error(`Expected a 1024x1024 8-bit RGBA non-interlaced PNG. Got ${width}x${height}, bitDepth=${bitDepth}, colorType=${colorType}, interlace=${interlace}.`);
}

const bytesPerPixel = 4;
const stride = width * bytesPerPixel;
const inflated = inflateSync(Buffer.concat(idatChunks));
const pixels = Buffer.alloc(height * stride);

function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

let inputOffset = 0;
for (let y = 0; y < height; y += 1) {
  const filter = inflated[inputOffset];
  inputOffset += 1;
  const rowStart = y * stride;

  for (let x = 0; x < stride; x += 1) {
    const raw = inflated[inputOffset + x];
    const left = x >= bytesPerPixel ? pixels[rowStart + x - bytesPerPixel] : 0;
    const up = y > 0 ? pixels[rowStart + x - stride] : 0;
    const upLeft = y > 0 && x >= bytesPerPixel ? pixels[rowStart + x - stride - bytesPerPixel] : 0;

    if (filter === 0) pixels[rowStart + x] = raw;
    else if (filter === 1) pixels[rowStart + x] = (raw + left) & 0xff;
    else if (filter === 2) pixels[rowStart + x] = (raw + up) & 0xff;
    else if (filter === 3) pixels[rowStart + x] = (raw + Math.floor((left + up) / 2)) & 0xff;
    else if (filter === 4) pixels[rowStart + x] = (raw + paethPredictor(left, up, upLeft)) & 0xff;
    else throw new Error(`Unsupported PNG filter ${filter}.`);
  }

  inputOffset += stride;
}

function writePng(filePath, cropX, cropY, cropWidth, cropHeight) {
  const raw = Buffer.alloc(cropHeight * (1 + cropWidth * bytesPerPixel));
  for (let y = 0; y < cropHeight; y += 1) {
    const rawRow = y * (1 + cropWidth * bytesPerPixel);
    raw[rawRow] = 0;
    const sourceStart = ((cropY + y) * width + cropX) * bytesPerPixel;
    pixels.copy(raw, rawRow + 1, sourceStart, sourceStart + cropWidth * bytesPerPixel);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(cropWidth, 0);
  ihdr.writeUInt32BE(cropHeight, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  writeFileSync(
    filePath,
    Buffer.concat([
      PNG_SIGNATURE,
      makeChunk("IHDR", ihdr),
      makeChunk("IDAT", deflateSync(raw, { level: 9 })),
      makeChunk("IEND"),
    ]),
  );
}

mkdirSync(outputDir, { recursive: true });

const bounds = [0, Math.floor(width / 3), Math.floor((width * 2) / 3), width];
const insetMap = [
  [6, 6, 8, 8],
  [8, 6, 8, 8],
  [8, 6, 6, 8],
  [6, 8, 8, 8],
  [8, 8, 8, 8],
  [8, 8, 6, 8],
  [6, 8, 8, 6],
  [8, 8, 8, 6],
  [8, 8, 6, 6],
];
const output = [];

for (let row = 0; row < 3; row += 1) {
  for (let col = 0; col < 3; col += 1) {
    const index = row * 3 + col + 1;
    const [leftInset, topInset, rightInset, bottomInset] = insetMap[index - 1];
    const x = bounds[col] + leftInset;
    const y = bounds[row] + topInset;
    const cropWidth = bounds[col + 1] - bounds[col] - leftInset - rightInset;
    const cropHeight = bounds[row + 1] - bounds[row] - topInset - bottomInset;
    const fileName = `oo-pose-${String(index).padStart(2, "0")}.png`;
    const filePath = join(outputDir, fileName);
    writePng(filePath, x, y, cropWidth, cropHeight);
    output.push({ file: filePath, x, y, width: cropWidth, height: cropHeight });
  }
}

console.log(JSON.stringify(output, null, 2));
