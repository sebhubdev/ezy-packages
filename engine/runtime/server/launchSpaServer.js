const express = require("express");
const path = require("path");

const app = express();
const buildPath = path.join(process.env.APP_PATH, "build");
app.use(express.static(buildPath));
app.get("*", (req, res) => res.sendFile(path.join(buildPath, "index.html")));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`SPA build listening on port ${port}`));
