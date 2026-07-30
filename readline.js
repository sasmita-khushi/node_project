import Readline from "node:readline/promises";
import fs from "node:fs/promises";

const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let name = await rl.question("Enter your name: ");
let age = await rl.question("Enter your age: ");
let sports = [];

let sportsComplete = false;
while (!sportsComplete) {
  let sport = await rl.question("Enter sports you like (Type done to exit): ");
  if (sport.toLowerCase() === "done") {
    sportsComplete = true;
    rl.close();
  } else {
    sports.push(sport);
  }
}

const user = {
  name: name,
  age: age,
  sports: sports,
};

const userData = JSON.stringify(user);

await fs.writeFile("data.json", userData);
