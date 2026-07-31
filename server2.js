// PRIVATE CHAT :

import net from "node:net";
import fs from "node:fs";

let ws = fs.createWriteStream("chat.txt", { flags: "a" });

let clients = [];
const server = net.createServer((socket) => {
  //broadcast(`${socket.username} joined the chat`);

  console.log(`Client ID:  ${socket.id}`);
  clients.push(socket);

  console.log("new client connected");
  socket.on("data", (chunk) => {
    let data = chunk.toString();
    let dataParts = data.split(" ");
    //console.log("dataParts[1]", dataParts[1])

    if (dataParts[0] === "/msg") {
      let target_userName = dataParts[1];
      let messageData = dataParts[2];
      privateMessage(socket, target_userName, messageData);
    } else if (dataParts[0] === "/name") {
      socket.username = dataParts[1];
      broadcast(` joined the chat`, socket);
    } else {
      broadcast(data, socket);
    }
  });
  socket.on("end", () => {
    console.log("client disconnected");
  });
});
server.listen(8000, () => {
  console.log("listening on port 8000 ");
});

function privateMessage(sender_socket, target_Name, message) {
  let targetUser = clients.find((client) => client.username === target_Name);

  if (targetUser && targetUser.writable) {
    targetUser.write(`${sender_socket.username}: ${message}`);
  } else {
    if (sender_socket.writable) {
      sender_socket.write(`${message}: user is offline`);
    }
  }
}

function broadcast(message, sender) {
  ws.write(`${message}\n`);
  clients.forEach((client) => {
    if (client !== sender && client.writable) {
      client.write(`${sender.username}: ${message}`);
    }
  });
}
