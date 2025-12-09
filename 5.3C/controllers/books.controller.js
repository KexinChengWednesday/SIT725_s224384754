const booksService = require('../services/books.service');

async function getAllBooks(req, res, next) {
  try {
    const books = await booksService.getAllBooks();
    res.status(200).json({
      statusCode: 200,
      data: books
    });
  } catch (err) {
    next(err);
  }
}

async function getBookById(req, res, next) {
  try {
    const id = req.params.id;
    const book = await booksService.getBookById(id);

    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      statusCode: 200,
      data: book
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllBooks,
  getBookById
};
