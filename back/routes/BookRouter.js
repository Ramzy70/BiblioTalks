const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

// Routes
router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getBookById);
router.post('/', BookController.createBook);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

// Filter and Search Routes

router.get('/filter/category/:category', BookController.getBooksByCategory);
router.get('/search/:keyword', BookController.searchBooks);
router.get('/:title/rating', BookController.getAverageRating);


// Rating Routes
module.exports = router;    