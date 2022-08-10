const express = require("express");
const cors = require("cors");
const axios = require("axios");
const packageJson = require("../package.json");
const mongoose = require("mongoose");
const { Movie } = require("./Schemas/Movie");
const PORT = process.env.port || 9001;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    version: packageJson.version,
  });
});

app.get("/api/placeholder", (req, res) => {
  axios
    .get("http://placeholder-api:9002/api/placeholder")
    .then((_res) => {
      res.json(_res.data);
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });
});

app.get("/api/movie", async (req, res) => {
  const movies = await Movie.find();
  return res.status(200).json(movies);
});

app.get("/api/movie/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  return res.status(200).json(movie);
});

app.post("/api/movie", async (req, res) => {
  const { title } = req.body;
  console.log("req.body", req.body, req.params)
  const newMovie = new Movie({title});
  const insertedMovie = await newMovie.save();
  return res.status(201).json(insertedMovie);
});

const mongoDBURL = `mongodb://nav:1234@mongo:27017/movies?authSource=admin`;

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("connected to the DB");
    app.listen(PORT, () => {
      console.log(`Server is listening to port ${PORT}`);
    });
  })
  .then((err, a) => {
    console.log(
      "---------------------> ERROR <-------------------------------"
    );
    console.log(err, a);
  });
