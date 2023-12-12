const socketIO = require('socket.io');

function initializeRealtimeMessaging(server) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle real-time messaging events
    socket.on('sendMessage', (data) => {
      // Broadcasting the received message to all connected clients
      io.emit('receiveMessage', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
}

module.exports = initializeRealtimeMessaging;
