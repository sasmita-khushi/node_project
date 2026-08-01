import { Duplex } from "node:stream";

class MyDuplex extends Duplex {
  constructor(options) {
    super(options);
    this.intervalId = null;
  }
  _read(size) {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        const temp = (Math.random() * 30 + 10).toFixed(1);
        this.push(temp);
      }, 1000);
    }
  }

  _write(chunk, encoding, callback) {
    const command = chunk.toString().trim().toUpperCase();
    console.log(`command received: ${command}`);

    if (command === "STOP") {
      clearInterval(this.intervalId);
      this.push(null);
      console.log("Sensor shut down.\n");
    }

    callback();
  }

  _destroy(error, callback) {
    clearInterval(this.intervalId);
    callback(error);
  }
}

const sensor = new MyDuplex();

sensor.pipe(process.stdout); //sensor (Readable)----> process.stdout (Writable)
process.stdin.pipe(sensor); //process.stdin (Readable) ---> sensor (Writable)
