const express = require("express");
const cors = require("cors");
const packageJson = require("../package.json");
const PORT = process.env.port || 9001;
const app = express();

app.use(cors())

app.get("/", (req, res) => {
  res.json({
    version: packageJson.version,
  });
});

app.get("/api/movies", (req, res) => {
  return res.json({
    1: {
      title: "Matrix",
    },
    2: {
      title: "Avatar",
    },
  });
});

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
