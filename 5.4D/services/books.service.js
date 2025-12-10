const mongoose = require('mongoose');
const Book = require('../models/book.model');

function mapDocToBook(doc) {
  return {
    id: doc.id,
    title: doc.title,
    author: doc.author,
    year: doc.year,
    genre: doc.genre,
    summary: doc.summary,
    price: doc.price ? doc.price.toString() : '',
  };
}

async function getAllBooks() {
  const docs = await Book.find().exec();
  return docs.map(mapDocToBook);
}

async function getBookById(id) {
  const doc = await Book.findOne({ id }).exec();
  if (!doc) return null;
  return mapDocToBook(doc);
}

async function createBook(data) {
  const doc = new Book({
    id: data.id,
    title: data.title,
    author: data.author,
    year: data.year,
    genre: data.genre,
    summary: data.summary,
    price: mongoose.Types.Decimal128.fromString(String(data.price)),
  });

  const saved = await doc.save();
  return mapDocToBook(saved);
}

async function updateBook(id, data) {
  const doc = await Book.findOne({ id }).exec();
  if (!doc) return null;

  if (data.title !== undefined) doc.title = data.title;
  if (data.author !== undefined) doc.author = data.author;
  if (data.year !== undefined) doc.year = data.year;
  if (data.genre !== undefined) doc.genre = data.genre;
  if (data.summary !== undefined) doc.summary = data.summary;
  if (data.price !== undefined) {
    doc.price = mongoose.Types.Decimal128.fromString(String(data.price));
  }

  const saved = await doc.save();
  return mapDocToBook(saved);
}

// DELETE /api/books/:id
async function deleteBook(id) {
  const result = await Book.deleteOne({ id }).exec();
  return result.deletedCount;
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
