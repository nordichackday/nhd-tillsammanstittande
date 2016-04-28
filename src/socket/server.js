import express  from 'express';
import http     from 'http';
import socketio from 'socket.io';

// Variables
const SOCKET_PORT = 4000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const connectedUsers = {};

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

  const userList = require('./component/user-list')(socket, connectedUsers);

  socket.on('username', (data) => {
    connectedUsers[socket.id].username = data;

    console.log('User is now known as ' + connectedUsers[socket.id].username);
  });

  socket.on('join-room', (data) => {
    const room = 'room-' + data.id;

    socket.join(room);
    connectedUsers[socket.id].room = room;

    console.log(connectedUsers[socket.id].username + ' just joined ' + connectedUsers[socket.id].room + '.');
  });

  socket.on('write', (data) => {
    const message = data;

    socket.to(connectedUsers[socket.id].room).emit('chat', {
      from: connectedUsers[socket.id].username,
      message: message
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });
});
