const concurrently = require("concurrently");

console.log("Init Dev");

const { commands, result } = concurrently(
  [
    { command: "npm run laterre:dev", name: "front", prefixColor: "blue" },
    {
      command: "npm run laterre-api:dev",
      name: "api",
      prefixColor: "orange",
    },
    { command: "npm run ui", name: "StoryBook", prefixColor: "white" },
  ],
  {
    prefix: "name",
    killOthers: ["failure"],
  }
);

result
  .then(() => {
    console.log("✅ All processes exited successfully");
  })
  .catch((err) => {
    console.error("❌ One of the processes failed", err);
    process.exit(1);
  });
