const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books.controller');

router.get('/api/books', booksController.getAllBooks);
router.get('/api/books/:id', booksController.getBookById);
module.exports = router;
