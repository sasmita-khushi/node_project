import { Readable, Writable } from "node:stream";
import crypto from "node:crypto";

class MyReadableStream extends Readable {
  #count = 0;
  constructor(option) {
    super(option);
  }

  _read(size) {
    // this.push("World");
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

let mws = new MyWritableStream();

mrs.pipe(mws);

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
