'use strict';

module.exports = function (socket) {
	console.log('User list loaded.');

	// Send list of users
	socket.emit('list', {
		users: [
			{
				name: 'Mormor',
				watching: {
					title: 'Skavlan'
				},
				room: 1
			}
		]
	});
};
