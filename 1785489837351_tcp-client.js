import net from "node:net";
import fs from "fs";

let name = "";
var opt = {
  port: 8000,
  host: "localhost",
};

const client = net.createConnection(opt, () => {
  console.log("Successfully connected to the server!");
  process.stdout.write("Enter your name: ");

  // Send some data to the server
});

let dataJson = "";

client.on("data", (data) => {
  //console.log(`${data.toString().trim()}`);
  let obj;

  let dataString = data.toString();
  console.log(dataString.indexOf("\n"));

  if (dataString.indexOf("\n") !== -1) {
    console.log("got linebreak");
    // end of message
    dataJson += dataString.trim();
    try {
      obj = JSON.parse(dataJson);
    } catch (err) {
      console.log("Invalid JSON");
      return;
    }
  }

  if (obj) {
    if (obj.type === "msg") {
      console.log(`${obj.name}: ${obj.data}`);
    }
    if (obj.type === "file") {
      console.log(
        `received a file ${obj.fileName} from ${obj.name}} going to create it`,
      );
      const fileBuffer = Buffer.from(obj.data, "base64");
      fs.writeFile(Date.now() + "-" + obj.fileName, fileBuffer, (err) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log("file created");
      });
    } else {
      dataJson += data.toString();
    }
  }

  // Close the connection after we get our answer
  // client.end();
});

client.on("error", (err) => {
  console.log(err);
});

client.on("end", () => {
  console.log("end");
  process.stdin.destroy();
  process.exit(0);
});

process.stdin.on("data", (chunk) => {
  if (!name) {
    name = chunk.toString().trim();
    return;
  }
  let typeInfo = chunk.toString().trim().split(":");
  //["file","output.tsx"]
  // ["hello"]
  if (typeInfo.length === 2) {
    if (typeInfo[0] === "file") {
      let fileName = typeInfo[1];
      fs.readFile(fileName, (err, data) => {
        if (err) {
          console.log(err);
        }
        let m = {
          name: name,
          type: "file",
          data: data.toString("base64"),
          fileName: fileName,
        };
        client.write(JSON.stringify(m) + "\n");
      });
    }
  } else {
    let m = {
      name: name,
      type: "msg",
      data: chunk.toString().trim(),
    };

    client.write(JSON.stringify(m) + "\n");
  }
});
