import fs from "node:fs";
import fsp from "node:fs/promises";
import { stdout } from "node:process";

const rs = fs.createReadStream("a.js", {
  encoding: "utf-8",
  highWaterMark: 3,
});

const stats = await fsp.stat("a.js");
const totalSize = stats.size;

const ws = fs.createWriteStream("h.js", { highWaterMark: 2 });

let progress = 0;
var percentage = 0;
rs.on("data", (chunk) => {
  // console.log(chunk.toString());

  progress += chunk.length;
  percentage = (progress / totalSize) * 100;
  stdout.write(`\r${percentage.toFixed(2)}%`);

  let success = ws.write(chunk);

  //   //

  //   if (!success) {
  //     // console.log("Ws : not able to write ,Please Pause reading");
  //     rs.pause();
  //   } else {
  //   }
});

rs.on("end", () => {
  // console.log("Read stream finished");
  ws.end();
});

rs.pipe(ws);

// ws.on("drain", () => {
//   //console.log("Ws : data drained resume the read stream");
//   //setTimeout(() => {
//   rs.resume();
//   //}, 1000);
// });

ws.on("finish", () => {
  console.log("Ws : writing Done");
});
