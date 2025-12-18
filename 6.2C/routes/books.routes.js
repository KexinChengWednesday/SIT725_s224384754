const express = require('express');
const booksRouter = express.Router();

const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/books.controller');
const { calculatePrice } = require('../controllers/books.controller');


const routes = [
  { method: 'get', path: '/api/books', handler: getAllBooks },
  { method: 'get', path: '/api/books/:id', handler: getBookById },
  { method: 'post', path: '/api/books', handler: createBook },
  { method: 'put', path: '/api/books/:id', handler: updateBook },
  { method: 'delete', path: '/api/books/:id', handler: deleteBook },
];
booksRouter.post('/api/books/total', calculatePrice);


routes.forEach((r) => {
  booksRouter[r.method](r.path, r.handler);
});

module.exports = booksRouter;
