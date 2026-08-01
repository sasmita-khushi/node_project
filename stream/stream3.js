import fs from "node:fs";

const rs = fs.createReadStream("a.js");

const ws = fs.createWriteStream("h.js");

rs.on("data", (chunk) => {
  let data = [...chunk];

  ws.write(data.join(","));
});

rs.on("end", () => {
  ws.end();
});
