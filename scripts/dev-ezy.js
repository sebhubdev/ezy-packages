const concurrently = require("concurrently");

console.log("Init Dev");

const { commands, result } = concurrently(
  [
    { command: "npm run front:dev", name: "front", prefixColor: "blue" },
    { command: "npm run admin:dev", name: "admin", prefixColor: "orange" },
    { command: "npm run builder:dev", name: "builder", prefixColor: "red" },
    { command: "npm run api:dev", name: "api", prefixColor: "green" },
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
