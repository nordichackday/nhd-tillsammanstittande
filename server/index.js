/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('index.html', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

// 'use strict';
// var express = require('express');
// var http = require('http');
// var socket = require('socket.io');
//
//
// // Variables
// var HTTP_PORT = 3000;
// var SOCKET_PORT = 4000;
//
//
// var app = express();
// var server = http.createServer(app);
// var io = socket(server);
//
// // Serve static files
// app.use(express.static(__dirname + '/public'));
// app.listen(HTTP_PORT, function () {
// 	console.log('HTTP server listening on localhost:' + HTTP_PORT + '.');
// });
//
//
//
// // Launch socket server.
// server.listen(SOCKET_PORT, function () {
// 	console.log('Socket server listening on localhost:' + SOCKET_PORT + '.');
// });
//
// // Socket server
// io.on('connection', function() {
// 	console.log('We have a connection.');
// });
