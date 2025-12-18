const express = require('express');
const path = require('path');
const mongoose = require('mongoose');//

const PORT = 3000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/booksDB';//thenameof db 

const app = express();

//mongodb
async function connectToDb() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('connected to', MONGO_URI);
  } catch (err) {
    console.error('error:', err);
  }
}


const publicDir = path.join(__dirname, 'public');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDir));


const booksRoutes = require('./routes/books.routes');


app.use('/', booksRoutes);


app.get('/', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});


async function start() {
  await connectToDb();
  app.listen(PORT, () => {
    console.log(`[boot] server listening at http://localhost:${PORT}`);
  });
}

start();

module.exports = app;
