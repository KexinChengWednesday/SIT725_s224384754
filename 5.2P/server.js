const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000; 


app.get('/ping', (_req, res) => {
  console.log('[HIT] /ping handler');
  res.send('pong');
});



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const booksRoutes = require('./routes/books.routes');
app.use('/api/books', booksRoutes);


app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



console.log('[BOOT] about to listen');
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

