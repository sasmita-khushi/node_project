function question(q) {
  return new Promise((resolve) => {
    process.stdout.write(q);
    process.stdin.once("data", (data) => {
      resolve(data.toString().trim());
    });
  });
}
let age = await question("Enter Your Age: ");
let name = await question("enter Your name: ");

process.stdin.destroy();
console.log(`Your name is ${name} and your age is ${age}`);
