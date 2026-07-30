import { Readable } from "node:stream";
import crypto from "node:crypto";

class MyReadableStream extends Readable {
  #count = 0;
  constructor(option) {
    super(option);
  }

  _read(size) {
    // this.push("World");
    this.push(crypto.randomBytes(size));

    this.push(null);
    // this.push(this.#count.toString());
    // this.#count++;
    // if (this.#count > 10) {
    //   this.push(null);
    // }
  }
}

let mrs = new MyReadableStream({ highWaterMark: 1 });

mrs.on("data", (chunk) => {
  console.log("Received data", [...chunk]);
});

mrs.on("end", () => {
  console.log("Stream Ended");
});
