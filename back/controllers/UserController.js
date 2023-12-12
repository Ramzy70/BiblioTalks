const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utility/config');
const blacklist = require('../utility/blacklist');

const Book = require('../models/Book');

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

// Controller for deleting all
exports.deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ message: 'All users deleted successfully' });
  } catch (error) {
    console.error('Error deleting all users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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

    // Controller for registring a new user
    exports.registerUser = async (req, res) => {
      try {
        const { username, email, password } = req.body;
    
        const existingUser = await User.findOne({  email  });
        if (existingUser) {
          return res.status(400).json({ error: 'User already exists' });
        }
    
        const newUser = new User({ username, email, password });
        await newUser.save();
    
        // Send a response back to the client
        res.status(201).json({ message: 'User registered successfully', user: newUser });
      } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
  
  
  // Login endpoint
  exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email: email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ user: { id: user._id, email: user.email } }, config.secretKey);

        // Include the token and redirect URL in the response
        res.status(200).json({ token,user, redirectUrl: '/users/protected-data' });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.logoutUser = (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (token) {
    // Add the token to the blacklist
    blacklist.add(token);
    res.json({ message: 'Logout successful' });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
};

exports.addToWishlist = async (req, res) => {
  const userId = req.user.id; // Extract user ID from the authenticated user
  const bookId = req.params.bookId; // Assuming you have bookId as a parameter in your route

  try {
    // Find the user
    const user = await User.findById(userId).populate('wishList');
    console.log('User:', user);

    // Find the book
    const book = await Book.findById(bookId);
    console.log(req.user.id)
    // Check if both user and book exist
    if (!user || !book) {
      return res.status(404).json({ error: 'User or book not found' });
    }

    // Check if the book is already in the wishlist
    if (user.wishList.includes(bookId)) {
      return res.status(400).json({ error: 'Book already in wishlist' });
    }

    // Add the book to the wishlist
    user.wishList.push(bookId);

    // Save the user
    await user.save();

    res.status(200).json({ message: 'Book added to wishlist successfully' });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

    
  // Controller for removing a book from the user's wishlist
  exports.removeFromWishlist = async (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.bookId;
  
    try {
      // Find the user
      const user = await User.findById(userId);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the book is in the wishlist
      const index = user.wishList.indexOf(bookId);
      if (index === -1) {
        return res.status(400).json({ error: 'Book not found in wishlist' });
      }
  
      // Remove the book from the wishlist
      user.wishList.splice(index, 1);
  
      // Save the user
      await user.save();
  
      res.status(200).json({ message: 'Book removed from wishlist successfully' });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  exports.addToAlreadyRead = async (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.bookId;
  
    try {
      const user = await User.findById(userId);
      const book = await Book.findById(bookId);
  
      if (!user || !book) {
        return res.status(404).json({ error: 'User or book not found' });
      }
  
      if (user.alreadyRead.includes(bookId)) {
        return res.status(400).json({ error: 'Book already in Already Read list' });
      }
  
      user.alreadyRead.push(bookId);
      await user.save();
  
      res.status(200).json({ message: 'Book added to Already Read list successfully' });
    } catch (error) {
      console.error('Error adding to Already Read list:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Controller for adding a book to the "Have Been Read" list
  exports.addToHaveBeenRead = async (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.bookId;
  
    try {
      const user = await User.findById(userId);
      const book = await Book.findById(bookId);
  
      if (!user || !book) {
        return res.status(404).json({ error: 'User or book not found' });
      }
  
      if (user.haveBeenRead.includes(bookId)) {
        return res.status(400).json({ error: 'Book already in Have Been Read list' });
      }
  
      user.haveBeenRead.push(bookId);
      await user.save();
  
      res.status(200).json({ message: 'Book added to Have Been Read list successfully' });
    } catch (error) {
      console.error('Error adding to Have Been Read list:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  exports.removeFromAlreadyRead = async (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.bookId;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the book is in the Already Read list
      if (!user.alreadyRead.includes(bookId)) {
        return res.status(400).json({ error: 'Book not in Already Read list' });
      }
  
      // Remove the book from the Already Read list
      user.alreadyRead = user.alreadyRead.filter((id) => id.toString() !== bookId);
      await user.save();
  
      res.status(200).json({ message: 'Book removed from Already Read list successfully' });
    } catch (error) {
      console.error('Error removing from Already Read list:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Controller for removing a book from the "Have Been Read" list
  exports.removeFromHaveBeenRead = async (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.bookId;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the book is in the Have Been Read list
      if (!user.haveBeenRead.includes(bookId)) {
        return res.status(400).json({ error: 'Book not in Have Been Read list' });
      }
  
      // Remove the book from the Have Been Read list
      user.haveBeenRead = user.haveBeenRead.filter((id) => id.toString() !== bookId);
      await user.save();
  
      res.status(200).json({ message: 'Book removed from Have Been Read list successfully' });
    } catch (error) {
      console.error('Error removing from Have Been Read list:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
// Controller for adding a rating and comment to a book
exports.addRatingAndComment = async (req, res) => {
  const userId = req.user.id; // Assuming you have user ID in the authenticated request
  const bookId = req.params.bookId; // Assuming you have book ID as a parameter in your route
  const { rating, comment } = req.body;

  try {
    // Find the user
    const user = await User.findById(userId);

    // Find the book
    const book = await Book.findById(bookId);

    // Check if both user and book exist
    if (!user || !book) {
      return res.status(404).json({ error: 'User or book not found' });
    }

    // Check if the user has already rated the book
    const existingReview = book.reviews.find(review => review.user.equals(userId));

    if (existingReview) {
      return res.status(400).json({ error: 'User has already rated the book' });
    }

    // Add the new rating and comment to the book's reviews
    book.reviews.push({
      user: userId,
      ratings: [rating],
      comments: [comment],
    });
  
    // Save the book
    await book.save();


    res.status(200).json({ message: 'Rating and comment added successfully' });
  } catch (error) {
    console.error('Error adding rating and comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
