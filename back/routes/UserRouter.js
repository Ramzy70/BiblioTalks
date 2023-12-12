const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authenticateMiddleware = require('../utility/auth');
router.get('/protected-data', authenticateMiddleware, (req, res) => {
    res.json({ message: 'This is protected data', user: req.user });
  });
// Routes
router.post('/', userController.createUser);
router.get('/',authenticateMiddleware, userController.getAllUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.delete('/', userController.deleteAllUsers);

router.get('/filter/superusers', userController.getSuperUsers);
router.get('/search/:keyword', userController.searchUsers);
router.post('/register', userController.registerUser);

router.post('/wishlist/:bookId', authenticateMiddleware, userController.addToWishlist);
router.delete('/wishlist/:bookId', authenticateMiddleware, userController.removeFromWishlist);
router.post('/alreadyread/:bookId', authenticateMiddleware, userController.addToAlreadyRead);
router.delete('/alreadyread/:bookId', authenticateMiddleware, userController.removeFromAlreadyRead);

router.post('/havebeenread/:bookId', authenticateMiddleware, userController.addToHaveBeenRead);
router.delete('/havebeenread/:bookId', authenticateMiddleware, userController.removeFromHaveBeenRead);

// Login endpoint
router.post('/login', userController.loginUser);
router.post('/logout',authenticateMiddleware, userController.logoutUser);
router.post('/:bookId/rating-comment', authenticateMiddleware, userController.addRatingAndComment);


// Protected route

router.get('/dyn/:id', userController.getUserById);

module.exports = router;