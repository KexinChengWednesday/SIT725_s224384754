const Book = require('../models/book.model');

async function getAllBooks() {
  const docs = await Book.find({}).lean({ getters: true });
  return docs;
}

async function getBookById(id) {
  const doc = await Book.findOne({ id }).lean({ getters: true });
  return doc;
}

module.exports = {
  getAllBooks,
  getBookById,
};
