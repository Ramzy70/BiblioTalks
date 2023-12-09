const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utility/config');
const authenticateMiddleware = require('../utility/auth');

// Controller for creating a new user
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for getting all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for getting a specific user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for updating a user by ID
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for deleting a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Controller for getting all superusers
exports.getSuperUsers = async (req, res) => {
    try {
      const superUsers = await User.find({ isSuperUser: true });
      res.status(200).json(superUsers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller for searching users by keyword
  exports.searchUsers = async (req, res) => {
    try {
      const keyword = req.params.keyword;
      const users = await User.find({
        $or: [
          { username: { $regex: keyword, $options: 'i' } },
          { email: { $regex: keyword, $options: 'i' } },
        ],
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      const newUser = new User({ username, email, password });
      await newUser.save();
  
      res.json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Registration Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Login endpoint
  exports.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ user: { id: user._id, username: user.username } }, config.secretKey);
      res.json({ token });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  