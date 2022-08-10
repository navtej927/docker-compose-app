const mongoose  = require("mongoose");
const { Schema } = mongoose;

const MovieSchema = new Schema({
  title: String,
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = { Movie };
