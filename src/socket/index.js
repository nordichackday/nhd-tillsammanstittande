const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');

// Variables
const SOCKET_PORT = 4000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

var connectedUsers = {};

// Launch socket server.
server.listen(SOCKET_PORT, () => {
	console.log('Socket server listening on localhost:' + SOCKET_PORT + '.');
});

// Socket server
io.on('connection', (socket) => {
	console.log('User connected.');

	connectedUsers[socket.id] = {
		socket: socket
	};

	var userList = require('./component/user-list')(socket, connectedUsers);

	socket.on('username', (data) => {
		connectedUsers[socket.id].username = data;

		console.log('User is now known as ' + connectedUsers[socket.id].username);
	});

	socket.on('disconnect', () => {
		console.log('User disconnected.');
	});
});
