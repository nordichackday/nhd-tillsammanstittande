'use strict';

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function() {
	// content
});

server.listen(3000);
