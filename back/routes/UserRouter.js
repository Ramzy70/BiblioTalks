const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authenticateMiddleware = require('../utility/auth');
router.get('/protected-data', authenticateMiddleware, (req, res) => {
    res.json({ message: 'This is protected data', user: req.user });
  });
// Routes
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/filter/superusers', userController.getSuperUsers);
router.get('/search/:keyword', userController.searchUsers);
router.post('/register', userController.registerUser);

// Login endpoint
router.post('/login', userController.loginUser);

// Protected route

router.get('/dyn/:id', userController.getUserById);

module.exports = router;