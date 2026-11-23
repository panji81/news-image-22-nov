// "The World — 22 Nov 2026": the entry is the entry.png beside this file.
// The program copies that image into the output directory: "out" by
// default, or MAKEFUN_OUTPUT_DIR when set. Node 22, standard library only,
// no network access; the copied bytes are identical on every run.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? 'out';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.png');
copyFileSync(join(here, 'entry.png'), outPath);

// Verify the copied output: it must be a non-empty PNG file.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const copied = readFileSync(outPath);
if (copied.length === 0 || !copied.subarray(0, 8).equals(PNG_MAGIC)) {
  console.error(`error: ${outPath} failed PNG verification (empty or bad magic bytes)`);
  process.exit(1);
}
