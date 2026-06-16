import sharp from "sharp";
import { readFile, writeFile, stat, rename } from "node:fs/promises";

const targets = [
  {
    input: "public/crest-main.png",
    output: "public/crest-main.png",
    maxDim: 720,
    transparent: true,
  },
  {
    input: "public/crest-totem.png",
    output: "public/crest-totem.png",
    maxDim: 900,
    transparent: false,
  },
];

const HARD = 250;
const SOFT = 215;

async function applyChromaKey(file) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const minRGB = Math.min(data[i], data[i + 1], data[i + 2]);
    if (minRGB >= HARD) {
      data[i + 3] = 0;
    } else if (minRGB >= SOFT) {
      const t = (minRGB - SOFT) / (HARD - SOFT);
      data[i + 3] = Math.round(data[i + 3] * (1 - t));
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9, palette: false })
    .toFile(file + ".tmp.png");

  await rename(file + ".tmp.png", file);
}

for (const t of targets) {
  const before = (await stat(t.input)).size;
  const buf = await readFile(t.input);

  const out = await sharp(buf)
    .resize({
      width: t.maxDim,
      height: t.maxDim,
      fit: "inside",
      withoutEnlargement: true,
    })
    .png({
      quality: 88,
      compressionLevel: 9,
      adaptiveFiltering: true,
      palette: !t.transparent,
    })
    .toBuffer();

  await writeFile(t.output, out);

  if (t.transparent) {
    await applyChromaKey(t.output);
  }

  const after = (await stat(t.output)).size;
  const ratio = ((1 - after / before) * 100).toFixed(1);
  console.log(
    `${t.input}: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB (-${ratio}%)${t.transparent ? " [+chroma]" : ""}`,
  );
}
