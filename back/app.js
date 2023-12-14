const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');
const userRouter = require('./routes/UserRouter');
const BookRouter = require('./routes/BookRouter');
const messageRouter = require('./routes/ChatRouter'); 
const initializeRealtimeMessaging = require('./realtimeMessaging'); // Importer le module de messagerie
const upload = require('./utility/multerConfig');
const path = require('path')

const app = express();
var cors = require('cors')
app.use(cors())
const PORT = process.env.PORT || 5000;
const server = http.createServer(app); // Create an HTTP server

// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname,"uploads")));

// Connect to MongoDB
mongoose.connect('mongodb+srv://BiblioTalks:64GL9SM0M5TCAKe0@cluster0.rtmbajz.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true  } );

// Check for successful MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Initialize WebSocket server and set it in the app
const io = initializeRealtimeMessaging(server);
app.set('socketio', io);

// Routes
app.use('/users', userRouter);
app.use('/books', BookRouter);
app.use('/messages', messageRouter);

const port = process.env.PORT || 5000;

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${port}`);
});