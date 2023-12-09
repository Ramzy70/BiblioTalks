const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/UserRouter');
const BookRouter = require('./routes/BookRouter');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://BiblioTalks:64GL9SM0M5TCAKe0@cluster0.rtmbajz.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Check for successful MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Routes
app.use('/users', userRouter);
app.use('/books', BookRouter);

const port = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
