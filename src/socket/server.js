import express  from 'express';
import http     from 'http';
import socketio from 'socket.io';
import userList from 'socket/component/user-list';

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

  userList(socket, connectedUsers);

  socket.on('username', (data) => {
    connectedUsers[socket.id].username = data;

    console.log('User is now known as ' + connectedUsers[socket.id].username);
  });

  socket.on('join-room', (data) => {
    const room = 'room-' + data.id;

    socket.join(room);
    connectedUsers[socket.id].room = room;

    console.log(connectedUsers[socket.id].username + ' just joined ' + connectedUsers[socket.id].room + '.');

    socket.to(connectedUsers[socket.id].room).emit('user-join', {
      user: connectedUsers[socket.id].username
    });
  });

  socket.on('write', (data) => {
    const message = data;

    socket.to(connectedUsers[socket.id].room).emit('chat', {
      from: connectedUsers[socket.id].username,
      message: message
    });
  });

  socket.on('emoji', (data) => {
    socket.to(connectedUsers[socket.id].room).emit('emoji', {
      from: connectedUsers[socket.id].username,
      message: data
    });
  });

  socket.on('mock', pickNextMock);

  socket.on('disconnect', () => {
    console.log('User disconnected.');

    if (connectedUsers[socket.id].room) {
      socket.to(connectedUsers[socket.id].room).emit('user-leave', {
        user: connectedUsers[socket.id].username
      });
    }

    delete connectedUsers[socket.id];
  });


  var mockMessages = [
    {
      event: 'chat',
      payload: {
        from: 'Mormor',
        message: 'Hej, vännen!'
      },
      delay: 6000
    },
    {
      event: 'chat',
      payload: {
        from: 'Mormor',
        message: 'Denna gubben är för rolig!'
      },
      delay: 10000
    },
    {
      event: 'emoji',
      payload: {
        from: 'Mormor',
        message: '😄'
      },
      delay: 2500
    },
    {
      event: 'chat',
      payload: {
        from: 'Mormor',
        message: 'Inte så mycket, intervjun har precis börjat.'
      },
      delay: 15000
    }
  ];

  function pickNextMock() {
    var current = mockMessages.shift();

    setTimeout(() => {
      sendMock(current);
    }, current.delay);
  };

  function sendMock(current) {
    socket.emit(current.event, current.payload);

    if (mockMessages.length > 0) {
      pickNextMock();
    }
  };
});
