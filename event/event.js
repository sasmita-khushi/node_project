import MyEventEmitter from "./my-event-emitter.js";

const emitter = new MyEventEmitter();

emitter.on("greet", () => {
  console.log("Hello!");
});

emitter.on("greet", () => {
  console.log("Heyllefs!");
});

emitter.once("greet", () => {
  console.log("hey");
});

emitter.emit("greet");
