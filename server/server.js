'use strict';
var express = require('express');
var http = require('http');
var socket = require('socket.io');


// Variables
var HTTP_PORT = 3000;
var SOCKET_PORT = 4000;


var app = express();
var server = http.createServer(app);
var io = socket(server);

// Serve static files
app.use(express.static(__dirname + '/public'));
app.listen(HTTP_PORT, function () {
	console.log('HTTP server listening on localhost:' + HTTP_PORT + '.');
});



// Launch socket server.
server.listen(SOCKET_PORT, function () {
	console.log('Socket server listening on localhost:' + SOCKET_PORT + '.');
});

// Socket server
io.on('connection', function() {
	console.log('We have a connection.');
});
