export default function (socket, connectedUsers) {
  console.log('User list loaded.');

  // Send list of users
  socket.emit('list', {
    users: [
      {
        name: 'Mormor',
        online: true,
        watching: {
          title: 'Skavlan'
        },
        room: 1
      },
      {
        name: 'Mamma',
        online: false,
        watching: null,
        room: 2
      }
    ]
  });
};
