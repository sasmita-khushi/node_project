let i = 0;

process.on("SIGINT", () => {
  console.log("Sigint event fired...Time to shutdown");
  process.exit();
});

process.stdin.on("data", (chunk) => {
  i = parseInt(chunk.toString().trim());
  if (i) {
    for (let j = 0; j < i; j++) {
      console.log(j);
    }
  }
  process.exit(0);
});
