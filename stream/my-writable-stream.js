import { Writable } from "node:stream";

class MyWritableStream extends Writable {
  constructor() {}

  _write(chunk, encoding, callback) {
    callback();
  }
}

let mws = new MyWritableStream();
