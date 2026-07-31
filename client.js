import fs from "fs";
import net from "net";

let name = "";
var opt = {
  host: "192.168.29.204",
  port: 8000,
};

const client = net.createConnection(opt, () => {
  console.log("Successfully connected to the server!");
  process.stdout.write("Enter Your Name : ");
});

client.on("data", (data) => {
  let obj;
  try {
    obj = JSON.parse(data.toString().trim());
  } catch (err) {
    console.log("Invalid JSON");
    return;
  }

  if (obj.type === "msg") {
    console.log(`${obj.name} : ${obj.data}`);
  }

  if (obj.type === "file") {
    console.log(
      `Received a file ${obj.filName} from ${obj.name} going to create it`,
    );
    const fileBuffer = Buffer.from(obj.data, "base64");

    fs.writeFile(Date.now() + "_" + obj.fileName, fileBuffer, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("file created");
    });
  }
});

client.on("end", () => {
  process.stdin.destroy();
  process.exit(0);
});

process.stdin.on("data", (chunk) => {
  if (!name) {
    name = chunk.toString().trim();
    return;
  }

  let typeInfo = chunk.toString().trim().split(":");

  if (typeInfo.length === 2) {
    if (typeInfo[0] === "file") {
      let filName = typeInfo[1];
      fs.readFile(filName, (err, data) => {
        if (err) {
          console.log("error");
        }
        let l = {
          name: name,
          type: "file",
          data: data.toString("base64"),
          fileName: filName,
        };

        client.write(JSON.stringify(l) + "\n");
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
