// Import the necessary libraries
const express = require('express');    // Express is used to handle HTTP requests
const http = require('http');          // HTTP module to create a server
const socketIo = require('socket.io'); // Socket.IO for real-time communication

// Initialize an Express app and create an HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO to work with the server
const io = socketIo(server);

// Serve static files (e.g., HTML, CSS, JS) from the 'public' folder
app.use(express.static('public'));

// Handle incoming WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');  // Log when a new user connects

    // Listen for 'chat message' events from the client
    socket.on('chat message', (msg) => {
        // Emit the message to all connected clients
        io.emit('chat message', msg);
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');  // Log when a user disconnects
    });
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000'); // Log that the server is running
});
