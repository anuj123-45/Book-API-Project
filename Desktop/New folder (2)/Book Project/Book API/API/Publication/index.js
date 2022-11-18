// initialize express router

const Router = require('express').Router();

// Prefix : /publication

// data models

const Publicationmodel=require('../../database/publication');




/*
Route ->  /all
Description-> to get all publications
Access -> public
Parameters -> publications
Method -> GET
*/

Router.get("/all/publications", async (req, res) => {
    const getAllPublications = await Publicationmodel.find();
  
    return res.json(getAllPublications);
  });
  
  /*
  Route ->  /publication
  Description-> to get specific based on id
  Access -> public
  Parameters -> id
  Method -> GET
  */
  
  Router.get("/:id", async (req, res) => {
    const getSpecificPublication = await Publicationmodel.findOne({
      id: parseInt(req.params.id),
    });
  
    if (!getSpecificPublication) {
      return res.json({ error: `No publication found for id ${req.params.id}` });
    }
  
    return res.json({ Publication: getSpecificPublication });
  });
  
  /*
  Route ->  /publication/book
  Description-> to get specific publications based on book
  Access -> public
  Parameters -> isbn
  Method -> GET
  */
  
  Router.get("/book/:isbn", async (req, res) => {
    const getSpecificPublication = await Publicationmodel.findOne({
      books: req.params.isbn,
    });
  
  
    if (!getSpecificPublication) {
      return res.json({ error: `No publication found for ${req.params.isbn}` });
    }
  
    return res.json({ Publications: getSpecificPublication });
  });
  
  
  
  
  
  /*
  Route ->  /publication/new
  Description->add new publication
  Access -> public
  Parameters -> none
  Method -> Post
  */
  
  Router.post("/new", async (req, res) => {
    const { newPublication } = req.body;
  
    const addNewPublication = Publicationmodel.create(newPublication);
  
    return res.json({
      addNewPublication,
    });
  });
  
  
  
  
  
  
  /*
  Route ->  /publication/update/
  Description->update publication name using id
  Access -> public
  Parameters -> id
  Method -> Put
  */
  
  Router.put("/update/:id", async (req, res) => {
    const updatedDetails = await Publicationmodel.findOneAndUpdate(
      {
        id: parseInt(req.params.id),
      },
      {
        name: req.body.newPublisherName,
      },
      {
        new: true,
      }
    );
  
  
    return res.json({ updatedDetails });
  });
  
  /*
  Route ->  /publication/update/book
  Description->update/add new book to a publication
  Access -> public
  Parameters -> isbn
  Method -> Put
  */
  
  Router.put("/update/book/:isbn", async (req, res) => {
    // update the publication database
  
    const updatedPublicationDatabase = await Publicationmodel.findOneAndUpdate(
      {
        id: req.body.pubId,
      },
      {
        $addToSet: {
          books: req.params.isbn,
        },
      }
    );
  

  
    // update the book database
  
    const updatedBookDatabase = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        publication: req.body.pubId,
      },
      {
        new: true,
      }
    );

  
    return res.json({ updatedPublicationDatabase, updatedBookDatabase });
  });
  
  
  
  
  /*
  Route ->  /publication/delete/book
  Description->delete a book from a publication
  Access -> public
  Parameters -> isbn,pubId
  Method -> Delete
  */
  
  Router.delete("/delete/book/:isbn/:pubId", async (req, res) => {
    // update the publication
    const updatedPublicationDatabase = await Publicationmodel.findOneAndUpdate(
      {
        id: parseInt(req.params.pubId),
      },
      {
        $pull: {
          books: req.params.isbn,
        },
      },
      {
        new:true,
      }
    );
  

  
    // update the book database;
  
    const updatedBookDatabase = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $set: {
          publication: 0,
        },
      },
      {
        new:true,
      }
    );
  
  
  
    return res.json({ updatedBookDatabase, updatedPublicationDatabase });
  });
  
  /*
  Route ->  /delete/publication/
  Description->delete a publication
  Access -> public
  Parameters -> id
  Method -> Delete
  */
  
  Router.delete("/delete/specific/:id", async(req, res) => {
  
  const updatedPublicationDatabase=await Publicationmodel.findOneAndDelete(
    {
      id:parseInt(req.params.id),
    }
    )
  

  res.json({updatedPublicationDatabase,message:"Current object deleted"});
  
  });

  module.exports=Router;