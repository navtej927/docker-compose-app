const express = require("express");
const axios = require("axios");
const PORT = process.env.port || 9002;
const app = express();

app.get("/api/placeholder", (req, res) => {
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((_res) => {
      const users = _res.data;
      res.json(users);
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });
});

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
