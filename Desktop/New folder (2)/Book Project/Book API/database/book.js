const mongoose = require("mongoose");

// creating a schema
const BookSchema = mongoose.Schema({
  ISBN: String,
  title: String,
  authors: [Number],
  language: String,
  pubDate: String,
  numOfPages: Number,
  category: [String],
  publication: Number,
});

// Create a book model

const Bookmodel = mongoose.model("books",BookSchema);

module.exports = Bookmodel;
