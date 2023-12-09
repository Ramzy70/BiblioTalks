const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  cover: {
    type: String, // Assuming you store the cover image URL
  },
  rating: {
    type: [Number], // Assume ratings is an array of numbers
    default: [],
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;