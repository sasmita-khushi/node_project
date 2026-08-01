import fs from "node:fs";

const rs = fs.readFile("package.json", (err, data) => {
  if (err) {
    console.log("something went wrong");
  } else {
    fs.writeFile("package-2.json", data, (err) => {
      if (err) {
        console.log("err");
      }
      console.log("Successfully Done");
    });
  }
});
