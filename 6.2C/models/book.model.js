const mongoose = require('mongoose');

const currentYear = new Date().getFullYear();

const BookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },

 title: {
  type: String,
  required: true,
  validate: {
    validator: function (value) {
      // only allow English characters /num /blankspace/-
      return /^[A-Za-z0-9 \-]+$/.test(value);
    }, // no other language (English only
    message: 'Only contains English letters, numbers, spaces and "-".',
  },
},


  author: {
  type: String,
  required: true,
  validate: {
    validator: function (value) {
      const parts = value.trim().split(/\s+/).filter(Boolean);
      if (parts.length < 2) {
        return false; // at least two words
      }
      for (let i = 0; i < parts.length; i++) {
        if (parts[i].length < 2) {
          return false;
        }
      }
      return true;
    },
    message: 'Author should be a full name (at least two words, no initials).',
  },
},


  //0-now
  year: {
    type: Number,
    required: true,
    min: 0,
    max: currentYear,
  },

  // limit catagory
  genre: {
    type: String,
    required: true,
    enum: ['Science Fiction', 'Classic', 'Historical Fiction', 'Fantasy', 'Other'],
  },

  // cant be too long or too short
  summary: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const words = value.trim().split(/\s+/).filter(Boolean);
        return words.length >= 16 && words.length <= 280;
      },
      message: 'Summary must be between 16 and 280 words.',
    },
  },

  // 0-200
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    validate: {
      validator: function (value) {
        const n = Number(value.toString());
        return !Number.isNaN(n) && n > 0 && n < 200;
      },
      message: 'Price must be greater than 0 and less than 200 AUD.',
    },
  },
});

module.exports = mongoose.model('Book', BookSchema);
