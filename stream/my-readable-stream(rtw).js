import { Readable, Writable, Transform } from "node:stream";
import crypto from "node:crypto";
import { pipeline } from "node:stream";

class MyReadableStream extends Readable {
  #count = 0;
  constructor(option) {
    super(option);
  }

  _read(size) {
    setTimeout(() => {
      this.push(crypto.randomBytes(size));
    }, 100);

    // this.push(null);
    // this.push(this.#count.toString());
    // this.#count++;
    // if (this.#count > 10) {
    //   this.push(null);
    // }
  }
}

let mrs = new MyReadableStream({ highWaterMark: 1 });

class MyWritableStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log("Writing chunk", [...chunk]);
    setTimeout(() => {
      callback();
    }, 300);
  }
}

let mws = new MyWritableStream({ highWaterMark: 1 });

class MyTransformStream extends Transform {
  _transform(chunk, encoding, callback) {
    const modifiedData = Buffer.concat([chunk, Buffer.from([33])]);

    callback(null, modifiedData);
  }
}

const mts = new MyTransformStream({ highWaterMark: 1 });
// mrs.pipe(mts).pipe(mws);

pipeline(mrs, mts, mws, (err) => {
  if (err) {
    console.log("Something went run", err);
  }
});

mrs.on("data", (chunk) => {
  console.log("Received data", [...chunk]);
});

mrs.on("end", () => {
  console.log("Stream Ended");
});

// let isPaused = false;

// process.stdin.on("data", (chunk) => {
//   if (isPaused) {
//     console.log("resumed the stream ");
//     mrs.resume();
//     isPaused = false;
//   } else {
//     console.log("Paused the stream");
//     mrs.pause();
//     isPaused = true;
//   }
// });
