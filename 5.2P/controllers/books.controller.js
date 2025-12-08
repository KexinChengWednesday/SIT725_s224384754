const booksService = require('../services/books.service');

// GET /api/books
function getAllBooks(req, res, next) {
  try {
    const items = booksService.getAllBooks();
    res.status(200).json({
      statusCode: 200,
      data: items,
      message: 'Books retrieved successfully'
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/books/:id
function getBookById(req, res, next) {
  try {
    const id = req.params.id;
    const book = booksService.getBookById(id);

    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      statusCode: 200,
      data: book,
      message: 'Book retrieved successfully'
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllBooks,
  getBookById
};
