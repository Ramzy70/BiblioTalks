const Book = require('../models/Book');
const upload = require('../utility/multerConfig');

// Controller for creating a new book
exports.createBook = async (req, res) => {
  try {
    // Access JSON data from req.body
    const { title, author, description, category } = req.body;

    // Access file details from req.file
    const coverImagePath = req.file.path;

    // Create a new book with both JSON data and file details
    const newBook = new Book({
      title,
      author,
      description,
      category,
      cover: coverImagePath,
      status: 'approved', 
    });

    // Save the book to the database
    await newBook.save();

    res.status(201).json({ message: 'Book created successfully', book: newBook });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Controller for getting all books
exports.getAllBooks = async (req, res) => {
  try {
    const approvedBooks = await Book.find({ status: 'approved' });
    res.status(200).json(approvedBooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for getting a specific approved book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, status: 'approved' });
    if (!book) {
      return res.status(404).json({ error: 'Book not found or not approved' });
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
    const { id } = req.params;
  
    try {
      const book = await Book.findById(id);
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      const ratings = book.rating || [];
  
      if (ratings.length === 0) {
        return res.status(200).json({ averageRating: 0 });
      }
  
      const sum = ratings.reduce((acc, rating) => acc + rating, 0);
      const averageRating = sum / ratings.length;
  
      res.status(200).json({ averageRating });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  // Controller for deleting all books
exports.deleteAllBooks = async (req, res) => {
  try {
    await Book.deleteMany({});
    res.status(200).json({ message: 'All books deleted successfully' });
  } catch (error) {
    console.error('Error deleting all books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};