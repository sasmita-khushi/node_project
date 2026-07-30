process.stdout.write("Enter Your Name:");

let interval = null;
process.stdin.on("data", (data) => {
  process.stdout.write(`hello ${data}`);
  clearInterval(interval);
  process.stdin.destroy();
});

let i = 0;
interval = setInterval(() => {
  console.log(i);
  i++;
}, 1000);
