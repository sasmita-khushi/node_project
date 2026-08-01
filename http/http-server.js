import http from "http";
import fs from "fs";

let rs = fs.createReadStream("client.js");

const server = http.createServer((req, res) => {
  rs.pipe(res);
});

server.listen(8000, () => {
  console.log("server is running on port no 3000");
});
