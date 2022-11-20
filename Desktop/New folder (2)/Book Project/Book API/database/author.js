const mongoose = require("mongoose");

// author schema
const AuthorSchema = mongoose.Schema({
  id:{
    type:Number,
    reuired:true,
  },
  name: {
    type:String,
    reuired:true,
  },
  books: {
    type:[String],
    reuired:true,
  },
});


// author model
const Authormodel = mongoose.model("authors",AuthorSchema);

module.exports = Authormodel;
