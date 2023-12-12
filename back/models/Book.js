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
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
    comments: [{
      type: String,
    }],
    ratings: [{
      type: Number,
    }],
  }],
  cover: {
    type: String,
  },
  rating: {
    type: [Number],
    default: [],
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
