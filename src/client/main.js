var user = 'Klara';

var socket = io('http://localhost:4000');

var $users = $('#users');

socket.on('connect', function () {
	$('.username').text(user);
	$('.user').show();

	socket.emit('username', user)
});

socket.on('list', function (data) {
	console.log('User list: ', data);

	$users.empty();

	$(data.users).each(function (index) {
		if (this.online) {
			$users.append('<li data-room="' + this.room + '"><b>' + this.name + '</b><br>Tittar på: ' + this.watching.title + '</li>');
		}
	});
});

socket.on('chat', function (data) {
	console.log(data);
});

$users.on('click', 'li', function () {
	var room = $(this).data('room');

	switchRoom(room);
});

$('.friends').click(function () {
	toggleMenu();
});

$('.user').click(function () {
	var name = prompt('What’s your name?');

	$('.username').text(name);

	socket.emit('username', name);
});

$('#page-video').click(function () {
	var message = prompt('Chat');

	socket.emit('write', message);
})

function switchRoom(room) {
	console.log('Trying to join room', room);

	socket.emit('join-room', {
		id: room
	});

	changeView('video');
	toggleMenu();
}

function changeView(view) {
	$('.page.active').removeClass('active');
	$('#page-' + view).addClass('active');
}

function toggleMenu() {
	$('body').toggleClass('menu-open');
}
