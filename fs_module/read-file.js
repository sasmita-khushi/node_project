import fs from "node:fs";

fs.readFile("package.json", (err, data) => {
  if (err) {
    console.log("something went run", err.message);
  } else {
    console.log([...data]);
  }
});
