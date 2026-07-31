import net from "net";
import fs from "fs";
const clients = [];

const ws = fs.createWriteStream("a.txt");
const server = net.createServer((socket) => {
  console.log("Connection is established....");
  clients.push(socket);

  socket.on("data", (chunk) => {
    broadcast(chunk.toString().trim(), socket);
  });

  socket.on("end", () => {
    console.log("Client Disconnected");
  });
});

server.listen(8080, () => {
  console.log("TCP Server listening on port 3000");
});

process.on("SIGINT", () => {
  clients.forEach((client) => {
    client.end();
  });
  server.close();
  process.exit();
});

function broadcast(message, sender) {
  ws.write(`${message}\n`);
  clients.forEach((client) => {
    if (client !== sender) {
      if (client.writable) {
        client.write(message);
      }
    }
  });
}
