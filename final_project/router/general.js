const express = require("express");
const axios = require("axios");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
  return users.some((user) => user.username === username);
};

const getBaseUrl = (req) => {
  return `${req.protocol}://${req.get("host")}`;
};

const getAllBooks = async (baseUrl) => {
  const response = await axios.get(`${baseUrl}/api/books`);
  return response.data;
};

const getBookByISBN = async (baseUrl, isbn) => {
  const response = await axios.get(`${baseUrl}/api/isbn/${isbn}`);
  return response.data;
};

const getBooksByAuthor = async (baseUrl, author) => {
  const response = await axios.get(
    `${baseUrl}/api/author/${encodeURIComponent(author)}`
  );
  return response.data;
};

const getBooksByTitle = async (baseUrl, title) => {
  const response = await axios.get(
    `${baseUrl}/api/title/${encodeURIComponent(title)}`
  );
  return response.data;
};

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Missing username or password" });
  } else if (doesExist(username)) {
    return res.status(404).json({ message: "user already exists." });
  } else {
    users.push({ username: username, password: password });
    return res
      .status(200)
      .json({ message: "User successfully registered.  Please login." });
  }
});

public_users.get("/api/books", (req, res) => {
  return res.status(200).json(books);
});

public_users.get("/api/isbn/:isbn", (req, res) => {
  const targetBook = books[req.params.isbn];

  if (!targetBook) {
    return res.status(404).json({ message: "ISBN not found." });
  }

  return res.status(200).json(targetBook);
});

public_users.get("/api/author/:author", (req, res) => {
  const matchingBooks = Object.values(books).filter(
    (book) => book.author.toLowerCase() === req.params.author.toLowerCase()
  );

  if (matchingBooks.length === 0) {
    return res.status(404).json({ message: "No books by that author." });
  }

  return res.status(200).json(matchingBooks);
});

public_users.get("/api/title/:title", (req, res) => {
  const matchingBook = Object.values(books).filter(
    (book) => book.title.toLowerCase() === req.params.title.toLowerCase()
  )[0];

  if (!matchingBook) {
    return res.status(404).json({ message: "Title not found." });
  }

  return res.status(200).json(matchingBook);
});

// Get the book list available in the shop
public_users.get("/", async (req, res) => {
  try {
    const allBooks = await getAllBooks(getBaseUrl(req));
    return res.status(200).send(JSON.stringify(allBooks, null, 4));
  } catch (e) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async (req, res) => {
  try {
    const targetBook = await getBookByISBN(getBaseUrl(req), req.params.isbn);
    return res.status(200).json(targetBook);
  } catch (e) {
    return res.status(404).json({ message: "ISBN not found." });
  }
});

// Get book details based on author
public_users.get("/author/:author", async (req, res) => {
  try {
    const matchingBooks = await getBooksByAuthor(
      getBaseUrl(req),
      req.params.author
    );
    return res.status(200).send(JSON.stringify(matchingBooks, null, 4));
  } catch (e) {
    return res.status(404).json({ message: "No books by that author." });
  }
});

// Get all books based on title
public_users.get("/title/:title", async (req, res) => {
  try {
    const matchingBook = await getBooksByTitle(getBaseUrl(req), req.params.title);
    return res.status(200).json(matchingBook);
  } catch (e) {
    return res.status(404).json({ message: "Title not found." });
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const targetISBN = req.params.isbn;
  const targetBook = books[targetISBN];
  if (targetBook) {
    return res.status(200).send(JSON.stringify(targetBook.reviews, null, 4));
  } else {
    return res.status(404).json({ message: "ISBN not found." });
  }
});

module.exports.general = public_users;
