import EventEmitter from "node:events";

const fireAlarm = new EventEmitter();

function onFire(smokeValue) {
  console.log("Fire detected with value", smokeValue);
}
fireAlarm.addListener("onFire", onFire);

fireAlarm.once("onFire", (smokeValue) => {
  console.log("calling police", smokeValue);
});

setInterval(() => {
  let smokeValue = Math.random();
  console.log("smokeValue is ..", smokeValue);
  if (smokeValue > 0.7) {
    fireAlarm.emit("onFire", smokeValue);
  }
}, 1000);
