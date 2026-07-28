import fs from "fs";

let x = "I am a goog Girl";

fs.writeFile("hello.tt", x, (err) => {
  if (err) {
    console.log("something went wrong", err);
  }
});
