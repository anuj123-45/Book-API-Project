require("dotenv").config();

// frame work
const express = require("express");

const mongoose = require("mongoose");

// database

const database = require("./database/index");

// models


// Microservices Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

// initializing express

const app = express();

// configuration

app.use(express.json());

// establish connection with database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //  useFindAndModify: false,
    //  useCreateIndex:true,
  })
  .then(() => {
    console.log("Connection established!!!!!!!!");
  });

// Initializing Microservices

app.use("/book", Books);
app.use("/author", Authors);
app.use("/publication", Publications);

app.listen(1000, () => console.log("Server running!!"));

// mongoose --> talk to database and also talk to us in the way we understand

// Why schema ?

// mongoDB is schemaless

// but mongoose is not schemaless

// mongoose helps in validation  (if data is valid then we proced) , relationship with other data(objects)

// mongoose model

// model--> represents document model of mongoDB    document(book,author,publisher)

// collections are individual databases

// Mongoose schema---> mongoose model -> use them
