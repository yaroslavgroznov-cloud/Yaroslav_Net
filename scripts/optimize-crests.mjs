import sharp from "sharp";
import { readFile, writeFile, stat } from "node:fs/promises";

const targets = [
  {
    input: "public/crest-main.png",
    output: "public/crest-main.png",
    maxDim: 720,
  },
  {
    input: "public/crest-totem.png",
    output: "public/crest-totem.png",
    maxDim: 900,
  },
];

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
      palette: true,
    })
    .toBuffer();

  await writeFile(t.output, out);
  const after = (await stat(t.output)).size;
  const ratio = ((1 - after / before) * 100).toFixed(1);
  console.log(
    `${t.input}: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB (-${ratio}%)`,
  );
}
