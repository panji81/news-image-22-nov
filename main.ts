// "The World — 22 Nov 2026": the entry is the entry.png beside this file.
// The program copies that image into the output directory: "out" by
// default, or MAKEFUN_OUTPUT_DIR when set. Node 22, standard library only,
// no network access; the copied bytes are identical on every run.
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? 'out';
mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, 'entry.png'), join(outDir, 'entry.png'));
