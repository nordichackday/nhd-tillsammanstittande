'use strict';

var express = require('express');
var http = require('http');
var socketio = require('socket.io');

// Variables
var SOCKET_PORT = 4000;

var app = express();
var server = http.createServer(app);
var io = socketio(server);


// Launch socket server.
server.listen(SOCKET_PORT, function () {
	console.log('Socket server listening on localhost:' + SOCKET_PORT + '.');
});


// Socket server
io.on('connection', function (socket) {
	console.log('User connected.');

	var userList = require('./component/user-list')(socket);

	socket.on('disconnect', function () {
		console.log('User disconnected.');
	});
});
