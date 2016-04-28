var socket = io('http://localhost:4000');

socket.on('list', function (data) {
	console.log('User list: ', data);

	var $users = $('#users');

	$(data.users).each(function (index) {
		$users.append('<li><b>' + this.name + '</b><br>Tittar på: ' + this.watching.title + 	'</li>');
	});
});
