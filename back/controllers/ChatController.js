const ChatMessage = require('../models/ChatMessage');
const User = require('../models/User');

// Controller for sending a group message
// Import necessary modules and models

// Controller for sending a group message to all users
exports.sendGroupMessageToAll = async (req, res) => {
  try {
    const { content } = req.body;
    const senderId = req.user._id; // Assuming you store user information in req.user
console.log(senderId)
    // Get all users (except the sender)
    const users = await User.find({ _id: { $ne: senderId } });

    // Create and save the message for each user
    const messages = await Promise.all(users.map(async (user) => {
      const chatMessage = new ChatMessage({
        sender: senderId,
        receivers: [user._id],
        content,
      });
      return chatMessage.save();
    }));

    res.status(201).json(messages);
  } catch (error) {
    console.error('Error sending group message to all users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for getting group messages for a user
exports.getGroupMessagesForUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Récupérer les messages de groupe pour l'utilisateur
    const groupMessages = await ChatMessage.find({ receivers: userId });

    res.status(200).json(groupMessages);
  } catch (error) {
    console.error('Error getting group messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};