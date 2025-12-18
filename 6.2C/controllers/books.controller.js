const booksService = require('../services/books.service');

const ALLOWED_FIELDS = ['id', 'title', 'author', 'year', 'genre', 'summary', 'price'];

function hasUnknownFields(obj) {
  return Object.keys(obj).some((key) => !ALLOWED_FIELDS.includes(key));
}

async function getAllBooks(_req, res, next) {
  try {
    const books = await booksService.getAllBooks();
    res.status(200).json({ statusCode: 200, data: books });
  } catch (err) {
    next(err);
  }
}

async function getBookById(req, res, next) {
  try {
    const id = req.params.id;
    const book = await booksService.getBookById(id);
    if (!book) {
      return res.status(404).json({ statusCode: 404, message: 'book not found' });
    }
    res.status(200).json({ statusCode: 200, data: book });
  } catch (err) {
    next(err);
  }
}

// POST /api/books
async function createBook(req, res, next) {
  try {
    const body = req.body;

    if (hasUnknownFields(body)) {
      return res.status(400).json({ message: 'unknown fields' });
    }

    try {
      const created = await booksService.createBook(body);
      return res.status(201).json(created);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ message: 'duplicate id' });
      }
      if (err.name === 'ValidationError' || err.name === 'BSONError') {
        return res.status(400).json({ message: 'validation error' });
      }
      throw err;
    }
  } catch (err) {
    next(err);
  }
}

// PUT /api/books/:id
async function updateBook(req, res, next) {
  try {
    const id = req.params.id;
    const body = req.body;

    if (hasUnknownFields(body)) {
      return res.status(400).json({ message: 'unknown fields' });
    }

    if (body.id && body.id !== id) {
      return res.status(400).json({ message: 'id cannot be changed' });
    }

    try {
      const updated = await booksService.updateBook(id, body);
      if (!updated) {
        return res.status(404).json({ message: 'book not found' });
      }
      return res.status(200).json(updated);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'validation error' });
      }
      throw err;
    }
  } catch (err) {
    next(err);
  }
}

// DELETE /api/books/:id
async function deleteBook(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: 'invalid id' });
    }

    const deletedCount = await booksService.deleteBook(id);
    if (!deletedCount) {
      return res.status(404).json({ message: 'book not found' });
    }

    return res.status(200).json({ message: 'book deleted', id });
  } catch (err) {
    next(err);
  }
}
const { calculateTotalPrice } = require('../services/books.service');

function calculatePrice(req, res) {
  const { price1, price2 } = req.body;

  try {
    const total = calculateTotalPrice(Number(price1), Number(price2));
    res.json({ total });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  calculatePrice,
};
