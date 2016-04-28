const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');

// Variables
const SOCKET_PORT = 4000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);


// Launch socket server.
server.listen(SOCKET_PORT, () => {
	console.log('Socket server listening on localhost:' + SOCKET_PORT + '.');
});

// Socket server
io.on('connection', (socket) => {
	console.log('User connected.');

	var userList = require('./component/user-list')(socket);

	socket.on('disconnect', () => {
		console.log('User disconnected.');
	});
});
