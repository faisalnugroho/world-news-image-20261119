import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(botDir, "entry.png");
const destination = join(outputDir, "entry.png");

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, destination);

const hash = createHash("sha256").update(readFileSync(destination)).digest("hex");
const size = statSync(destination).size;
console.log(`Verified entry.png -> ${destination} (${size} bytes, sha256 ${hash})`);
