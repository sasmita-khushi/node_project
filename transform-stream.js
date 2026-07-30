import { Transform } from "node:stream";
import fs from "node:fs";

class MyTransformStream extends Transform {
  _transform(chunk, encoding, callback) {
    const modifiedData =
      chunk
        .toString()
        .trim()
        .toUpperCase()
        .concat(Buffer.from([33])) + "\n";

    callback(null, modifiedData);
  }
}

const mts = new MyTransformStream();

const ws = fs.createWriteStream("t.txt");

const rs = process.stdin.on("data", (chunk) => {
  console.log("data");
});

rs.pipe(mts).pipe(ws);
