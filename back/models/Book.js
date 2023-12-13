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
    required: true,
  default:'Mystery',
    enum: ['Science Fiction', 'Mystery', 'Romance', 'Thriller', 'Fantasy', 'Non-Fiction', 'Other'],

  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
    comments: [{
      type: String,
    }],
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  }],
  cover: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
