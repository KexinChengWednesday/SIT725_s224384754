const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books.controller');

router.get('/api/books', booksController.getAllBooks);
router.get('/api/books/:id', booksController.getBookById);
router.post('/api/books', booksController.createBook);
router.put('/api/books/:id', booksController.updateBook);
router.delete('/api/books/:id', booksController.deleteBook);

module.exports = router;
