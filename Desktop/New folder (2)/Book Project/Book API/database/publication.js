const mongoose = require("mongoose");

// publication schema
const PublicationSchema = mongoose.Schema({
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

// publication model
const Publicationmodel = mongoose.model("publication",PublicationSchema);

module.exports = Publicationmodel;
