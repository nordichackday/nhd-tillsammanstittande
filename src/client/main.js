var user = 'Alexander';

var socket = io('http://localhost:4000');

var $users = $('#users');

socket.on('connect', function () {
	socket.emit('username', user)
});

socket.on('list', function (data) {
	console.log('User list: ', data);

	$users.empty();

	$(data.users).each(function (index) {
		if (this.online) {
			$users.append('<li><b>' + this.name + '</b><br>Tittar på: ' + this.watching.title + '</li>');
		}
	});
});

$('.placeholder').click(function () {
	$('body').toggleClass('menu-open');
});
