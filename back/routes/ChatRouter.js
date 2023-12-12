const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/ChatController');
const { authenticateMiddleware, authAdminMiddleware } = require('../utility/auth');

// Routes
router.get('/group-messages/:userId', authenticateMiddleware, ChatController.getGroupMessagesForUser);
router.post('/group-message-to-all', authenticateMiddleware, ChatController.sendGroupMessageToAll);

module.exports = router;