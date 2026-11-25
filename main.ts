import { readFileSync } from "node:fs";

const MAX_CHARS = 200;

const raw = readFileSync(new URL("./one-line.txt", import.meta.url), "utf8");
const line = raw.replace(/\n$/, "");

const failures: string[] = [];
if (line.length === 0) failures.push("empty line");
if ([...line].length > MAX_CHARS) failures.push(`too long: ${[...line].length}/${MAX_CHARS} characters`);
if (line !== line.trim()) failures.push("leading or trailing whitespace");
if (line.includes("\r")) failures.push("carriage return found");
if (line.includes("\n")) failures.push("more than one line");
if (/\s{2,}/.test(line)) failures.push("double space inside the line");
if (!/[.!?]["']?$/.test(line)) failures.push("must end with terminal punctuation");

if (failures.length > 0) {
  for (const f of failures) console.error(`FAIL: ${f}`);
  process.exit(1);
}

console.log(line);
console.log(`OK: ${[...line].length}/${MAX_CHARS} characters, single line, clean pun delivered.`);
