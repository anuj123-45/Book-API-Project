// initialize express router

// Prefix : /author

const Router=require('express').Router();

// data models

const AuthorModel=require('../../database/author');

/*
Route ->  /all
Description-> to get all authors
Access -> public
Parameters -> authors
Method -> GET
*/

Router.get("/all/authors", async (req, res) => {
  try{
    const getAllAuthors = await AuthorModel.find();
    return res.json({ authors: getAllAuthors });
  }
  catch(error){
    res.json({error:error.message});
  }
  });
  


  /*
Route ->  /author
Description-> to get specific author based on id
Access -> public
Parameters -> id
Method -> GET
*/

Router.get("/:id", async (req, res) => {
  try{
    const getSpecificAuthor = await AuthorModel.findOne({
      id: parseInt(req.params.id),
    });
  
    if (!getSpecificAuthor) {
      return res.json({ error: `No author found for id ${req.params.id}` });
    }
  
    return res.json({ author: getSpecificAuthor });
  }
  catch(error){
    res.json({error:error.message});
  }
  });


  /*
Route ->  /author
Description-> to get list of all authors based on books
Access -> public
Parameters -> isbn
Method -> GET
*/

Router.get("all/:isbn", async (req, res) => {
  try{
    const getSpecificAuthors = await AuthorModel.findOne({
      books: req.params.isbn,
    });

  
    if (!getSpecificAuthors) {
      return res.json({
        error: `No author found for the book ${req.params.isbn}`,
      });
    }
    return res.json({ authors: getSpecificAuthors });
  }
  catch(error){
    res.json({error:error.message});
  }
  });


  /*
Route ->  /author/new
Description->add new author
Access -> public
Parameters -> none
Method -> Post
*/

Router.post("/new", async (req, res) => {
    const { newAuthor } = req.body;
  
    AuthorModel.create(newAuthor);
    const allauthor = await AuthorModel.find();
    return res.json({ allauthor, message: "New Author added" });
  });


  /*
Route ->  /author/update/
Description->update author name using id
Access -> public
Parameters -> id
Method -> Put
*/

Router.put("/update/:id", async (req, res) => {
  try{
    const updatedAuthorName = await AuthorModel.findOneAndUpdate(
      {
        id: parseInt(req.params.id),
      },
      {
        name: req.body.newAuthorName,
      },
      {
        new: true,
      }
    );
  

    return res.json({ updatedAuthorName,message: "Successfully updated" });
  }
  catch(error){
    res.json({error:error.message});
  }
  });
  
  /*
Route ->  /delete/author/
Description->delete a author
Access -> public
Parameters -> id
Method -> Delete
*/

Router.delete("/delete/:id", async (req, res) => {
  try{
    const updatedAuthor = await AuthorModel.findOneAndDelete({
      id: parseInt(req.params.id),
    });
 
    return res.json({
      updatedAuthor,
      message: "Author deleted successfully",
    });
  }
  catch(error){
    res.json({error:error.message});
  }
  });
  

  module.exports=Router