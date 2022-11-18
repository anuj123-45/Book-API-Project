let books = [
  {
    ISBN: "12345ONE",
    title: "Getting started with MERN",
    authors: [1, 2],
    language: "en",
    pubDate: "2022-07-02",
    numOfPages: 225,
    category: ["fiction", "programming", "tech", "webdev"],
    publication: 1,
  },
  {
    ISBN: "12345TWO",
    title: "Getting started with Python",
    authors: [1, 2],
    language: "en",
    pubDate: "2022-07-02",
    numOfPages: 225,
    category: ["fiction", "programming", "AI", "webdev"],
    publication: 1,
  },
];

let authors = [
  {
    id: 1,
    name: "pavan",
    books: ["12345ONE", "12345TWO"],
  },

  {
    id: 2,
    name: "anuj",
    books: ["12345ONE"],
  },
];

let publications = [
  {
    id: 1,
    name: "Chakra",
    books: ["12345ONE"],
  },

  {
    id: 2,
    name: "Ashoka",
    books: ["12345ONE", "12345TWO"],
  },
];

module.exports = { books, authors, publications };
