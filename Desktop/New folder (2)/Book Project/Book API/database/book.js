const mongoose = require("mongoose");

// creating a schema
const BookSchema = mongoose.Schema({
  ISBN: {
    type:String,
    required:true,
    minLength:8,
    maxLength:10,
  },  // required
  title:  {
    type:String,
    required:true,
  },
  authors:  {
    type:[Number],
    required:true,
  },
  language:  {
    type:String,
    required:true,
  },
  pubDate:  {
    type:String,
    required:true,
  },
  numOfPages:  {
    type:Number,
    required:true,
  },
  category:  {
    type:[String],
    required:true,
  },
  publication: {
    type:Number,
    required:true,
  },
});

// Create a book model

const Bookmodel = mongoose.model("books",BookSchema);

module.exports = Bookmodel;
