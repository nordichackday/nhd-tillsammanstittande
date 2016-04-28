'use strict';

var express = require('express');

var HTTP_PORT = 3000;

var app = express();

// Serve static files
app.use(express.static(__dirname + '/../public'));

app.listen(HTTP_PORT, function () {
	console.log('HTTP server listening on localhost:' + HTTP_PORT + '.');
});
