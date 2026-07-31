import net from "net";
import readline from "node:readline/promises";

let opt = {
  port: 8000,
  host: "localhost",
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let name = await rl.question("Enter your name: ");

const client = net.createConnection(opt, () => {
  console.log("Successfully connected to the server!");
  client.write(`/name ${name}`);
});

rl.on("line", (message) => {
  client.write(`${message}`);
});

client.on("data", (data) => {
  console.log(data.toString().trim());
});
