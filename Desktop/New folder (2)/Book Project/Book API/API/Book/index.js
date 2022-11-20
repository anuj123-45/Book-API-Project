// intitializing express router

//Prefix : /book

const Router = require("express").Router();

// database models

const BookModel = require("../../database/book");

/*
Route ->  /
Description-> to get all books
Access -> public
Parameters -> none
Method -> GET
*/

Router.get("/", async (req, res) => {
  try {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
  } catch (error) {
    return res.json({ error: error.message });
  }
});

/*
Route ->  /
Description-> to get specific book based on isbn
Access -> public
Parameters -> isbn
Method -> GET
*/
Router.get("/:isbn", async (req, res) => {
  try {
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

    if (!getSpecificBook) {
      return res.json({
        error: `No book found for ISBN of ${req.params.isbn}`,
      });
    }
    return res.json(getSpecificBook);
  } catch (error) {
    res.json({ error: error.message });
  }
});

/*
Route ->  /c
Description-> to get list of  books based on category
Access -> public
Parameters -> category
Method -> GET
*/

Router.get("/c/:category", async (req, res) => {
  try {
    const getSpecificBooks = await BookModel.findOne({
      category: req.params.category,
    });

    if (!getSpecificBooks) {
      return res.json({
        error: `No book found for the category of ${req.params.category}`,
      });
    }

    return res.json(getSpecificBooks);
  } catch (error) {
    res.json({ error: error.message });
  }
});

/*
Route ->  /a
Description-> to get list of  books based on author
Access -> public
Parameters -> author
Method -> GET
*/

Router.get("/a/:author", async (req, res) => {
  try {
    const getSpecificBooks = await BookModel.findOne({
      authors: parseInt(req.params.author),
    });

    if (!getSpecificBooks) {
      return res.json({
        error: `No book found for author id ${req.params.author}`,
      });
    }

    return res.json(getSpecificBooks);
  } catch (error) {
    res.json({ error: error.message });
  }
});

/*
Route ->  /book/new
Description->add new book
Access -> public
Parameters -> none
Method -> Post
*/

Router.post("/new", async (req, res) => {
  try {
    const { newBook } = req.body;
    await BookModel.create(newBook);

    return res.json({ message: "book was added" });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

/*
Route ->  /book/update/:isbn
Description->update book details (like eg--> title)
Access -> public
Parameters -> isbn
Method -> Put
*/

Router.put("/update/:isbn", async (req, res) => {
  try {
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        title: req.body.bookTitle,
      },
      {
        new: true,
      }
    );

    return res.json({ updatedBook });
  } catch (error) {
    res.json({ error: error.message });
  }
});

/*
Route ->  /book/author/update/:isbn
Description->update/add new author
Access -> public
Parameters -> isbn
Method -> Put
*/

Router.put("/author/update/:isbn", async (req, res) => {
  try {
    // update the book database
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $addToSet: {
          authors: req.body.newAuthor,
        },
      },
      {
        new: true,
      }
    );

    // update the author database

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
      {
        id: req.body.newAuthor,
      },
      {
        $addToSet: {
          books: req.params.isbn,
        },
      },
      {
        new: true,
      }
    );

    return res.json({
      updatedBook,
      updatedAuthor,
      message: "New Author added",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

/*
Route ->  /book/delete
Description->delete a book
Access -> public
Parameters -> isbn
Method -> Delete
*/

Router.delete("/delete/:isbn", async (req, res) => {
  try {
    const updatedBookDatabase = await BookModel.findOneAndDelete({
      ISBN: req.params.isbn,
    });

    return res.json(updatedBookDatabase);
  } catch (error) {
    res.json({ error: error.message });
  }
});

/*
Route ->  /book/delete/author
Description->delete a author from a book
Access -> public
Parameters -> isbn,authId
Method -> Delete
*/

Router.delete("/delete/author/:isbn/:authId", async (req, res) => {
  try {
    // update the book database

    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $pull: {
          authors: parseInt(req.params.authId),
        },
      },
      {
        new: true,
      }
    );

    // update the author database

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
      {
        id: parseInt(req.params.authId),
      },
      {
        $pull: {
          books: req.params.isbn,
        },
      },
      {
        new: true,
      }
    );

    return res.json({
      book: updatedBook,
      author: updatedAuthor,
      message: "Author deleted!!!",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = Router;
