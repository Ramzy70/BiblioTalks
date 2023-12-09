const Book = require('../models/Book');

// Controller for creating a new book
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for getting all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for getting a specific book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for updating a book by ID
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for deleting a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(deletedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getBooksByCategory = async (req, res) => {
    try {
      const category = req.params.category;
      const books = await Book.find({ category });
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller for searching books by keyword
  exports.searchBooks = async (req, res) => {
    try {
      const keyword = req.params.keyword;
      const books = await Book.find({
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { author: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      });
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Controller for getting the average rating of a book by title
  exports.getAverageRating = async (req, res) => {
    const { title } = req.params;
  
    try {
      // Using findOne to find a book by its title
      const book = await Book.findOne({ title: new RegExp('^' + title + '$', 'i') });
      console.log('Route Parameters:', req.params);
      
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      // Rest of the controller logic...
  
      // Calculate average rating logic
      const ratings = book.ratings || [];
  
      if (ratings.length === 0) {
        return res.status(200).json({ averageRating: 0 });
      }
  
      const sum = ratings.reduce((acc, rating) => acc + rating, 0);
      const averageRating = sum / ratings.length;
  
      res.status(200).json({ averageRating });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    }
  };