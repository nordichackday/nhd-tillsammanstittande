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
	connectedUsers[socket.id] = {
		socket: socket,
		username: null,
		room: false
	};

	console.log('User connected. There are now ' + Object.keys(connectedUsers).length + ' users online.');

	var userList = require('./component/user-list')(socket, connectedUsers);

	socket.on('username', (data) => {
		connectedUsers[socket.id].username = data;

		console.log('User is now known as ' + connectedUsers[socket.id].username);
	});

	socket.on('join-room', (data) => {
		var room = 'room-' + data.id;

		socket.join(room);
		connectedUsers[socket.id].room = room;

		console.log(connectedUsers[socket.id].username + ' just joined ' + connectedUsers[socket.id].room + '.');
	});

	socket.on('write', (data) => {
		var message = data;

		socket.to(connectedUsers[socket.id].room).emit('chat', message);
	});

	socket.on('disconnect', () => {
		console.log('User disconnected.');
	});


});
