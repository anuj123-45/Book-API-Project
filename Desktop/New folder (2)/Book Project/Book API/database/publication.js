const mongoose = require("mongoose");

// publication schema
const PublicationSchema = mongoose.Schema({
  id: Number,
  name: String,
  books: [String],
});

// publication model
const Publicationmodel = mongoose.model("publication",PublicationSchema);

module.exports = Publicationmodel;
