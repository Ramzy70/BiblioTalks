const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const authenticateMiddleware = require('../utility/auth');

// Routes
router.get('/',authenticateMiddleware, BookController.getAllBooks);
router.get('/:id',authenticateMiddleware, BookController.getBookById);
router.post('/', authenticateMiddleware,BookController.createBook);
router.put('/:id',authenticateMiddleware, BookController.updateBook);
router.delete('/:id', authenticateMiddleware,BookController.deleteBook);
router.delete('/', authenticateMiddleware,BookController.deleteAllBooks);

// Filter and Search Routes

router.get('/filter/category/:category', BookController.getBooksByCategory);
router.get('/search/:keyword', BookController.searchBooks);
router.get('/:id/rating', BookController.getAverageRating);


// Rating Routes
module.exports = router;    