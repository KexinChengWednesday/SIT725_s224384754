const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/booksDB';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to', MONGO_URI);
  })
  .catch((err) => {
    console.error('error', err);
  });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const booksRoutes = require('./routes/books.routes');
app.use('/', booksRoutes);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
