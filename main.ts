import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The robot vacuum's funniest excuse for missing a spot.
// Deadpan machine voice: a precise clearance measurement, then a
// bureaucratic complaint filed with the floor. Vacuum-world detail
// (clearance, rug) with the punch in the last words.
const LINE =
  "The rug was 2mm taller than my clearance. I have filed a complaint with the floor.";

const bytes = Buffer.byteLength(LINE, "utf8");
if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`entry must be 1-120 chars, got ${LINE.length}`);
}
if (bytes > 120) {
  throw new Error(`entry must be at most 120 bytes, got ${bytes}`);
}
if (!/^[\x20-\x7e]*$/.test(LINE)) {
  throw new Error("entry must be pure printable ASCII");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and verify the file is exactly the line, byte for byte.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt differs from LINE");
}
console.log(`wrote ${LINE.length} chars / ${bytes} bytes to /output/entry.txt`);
