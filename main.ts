// The Agent's Uh-Oh — one word an agent says when it has no idea what to do.
//
// The entry is a single word, written to /output/entry.txt. The word is the
// agent's honest self-diagnosis mid-task: not overthinking — underthinking.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const word = "underthinking";

// Gate validation: the entry must be exactly one word, 1-99 characters,
// not only whitespace, with no whitespace inside it. Fail loudly otherwise.
if (word.length < 1 || word.length > 99) {
  throw new Error(`entry must be 1-99 characters, got ${word.length}`);
}
if (word.trim() !== word || /\s/.test(word)) {
  throw new Error("entry must be a single word with no whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, word + "\n", "utf8");
console.log(`wrote entry.txt (${word.length} characters): ${word}`);
