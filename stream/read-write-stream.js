//BACK PRESSURE HANDLING

import fs from "node:fs";

const rs = fs.createReadStream("text.txt", {
  highWaterMark: 2,
});

const ws = fs.createWriteStream("text-2.txt", {
  highWaterMark: 2,
});

// rs.on("pause", () => {
//   console.log("stream Paused");
// });

// rs.on("resume", () => {
//   console.log("stream resumed");
// });

// rs.on("data", (chunk) => {
//   console.log("got Data", chunk.toString());

//   let success = ws.write(chunk);

//   if (!success) {
//     console.log("Ws : not able to write ,Please Pause reading");
//     rs.pause();
//   }
// });

// ws.on("finish", () => {
//   console.log("Ws : writing Done");
// });

// ws.on("drain", () => {
//   console.log("Ws : data drained resume the read stream");
//   rs.resume();
// });

// rs.on("data", (data) => {
//   let myData = [...data];
//   let success = ws.write(myData.join(","));
//   if (!success) {
//     console.log("unable to write ...");
//     rs.pause();
//   }
// });

// rs.pipe(ws);

// ws.on("close", () => {
//   console.log("writing done");
// });
