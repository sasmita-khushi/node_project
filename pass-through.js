import { Transform, PassThrough, pipeline } from "node:stream";
import fs from "node:fs";

class MyTransformStream extends Transform {
  _transform(chunk, encoding, callback) {
    const modifiedData = chunk.toString().trim().toUpperCase() + "!\n";
    callback(null, modifiedData);
  }
}

const mts = new MyTransformStream();
const ws = fs.createWriteStream("t.txt");

const monitorStream = new PassThrough();

monitorStream.on("data", (chunk) => {
  console.log(`[Monitor] Received data: ${chunk.toString().trim()}`);
});

// process.stdin
//   .pipe(monitorStream) // stdin pipes into the monitor
//   .pipe(mts) // monitor pipes into your uppercase transform
//   .pipe(ws); // uppercase transform pipes to the file

pipeline(process.stdin, monitorStream, mts, ws, (err) => {
  if (err) {
    console.log("error is ", err);
  }
  console.log("successfull written");
});
