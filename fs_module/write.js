import fs from "node:fs";

const ws = fs.createWriteStream("y.js");

let count = 1;

process.stdin.on("data", (chunk) => {
  const data = chunk.toString();

  ws.write(`${count} - ${data}`);
  count++;
});
