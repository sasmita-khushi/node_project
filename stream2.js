import fs from "node:fs";

const rs = fs.createReadStream("event.js", {
  encoding: "utf-8",
  highWaterMark: 3,
});

const ws = fs.createWriteStream("h.js", { highWaterMark: 2 });
