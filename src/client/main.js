import menuComponent        from 'client/components/menu';
import videoPlayerComponent from 'client/components/video-player';

const socket = io('http://localhost:4000');
const $users = $('#users');

const menu        = menuComponent(socket);
const videoPlayer = videoPlayerComponent(socket);

socket.on('list', function (data) {
	console.log('User list: ', data);
/*
	$users.empty();

	$(data.users).each(function (index) {
		if (this.online) {
			$users.append('<li data-room="' + this.room + '"><b>' + this.name + '</b><br>Tittar på: ' + this.watching.title + '</li>');
		}
	});
*/
});

socket.on('chat', function (data) {
	showChatMessage(data);
});

$users.on('click', 'li', function () {
	var room = $(this).data('room');

	switchRoom(room);
});

$('.imagelogo').click(function () {
	changeView('start');
});

$('.friends-button').click(function (event) {
	event.preventDefault();

	toggleMenu();
});

$('.chat-button').click(function (event) {
	event.preventDefault();
	// var message = prompt('Chat');
	$('.chat-input').toggleClass('visible').focus();


});

$('.chat-input').keydown(function (event) {
	console.log(event);

	if (event.keyCode === 13) {
		var message = $(this).val();

		if (message) {
			socket.emit('write', message);
		}

		$(this).val('');
	}
});

function switchRoom(room) {
	console.log('Trying to join room', room);

	socket.emit('join-room', {
		id: room
	});

	changeView('video');
	toggleMenu();

	// setTimeout(function () {
	// 	videoPlayer.play();
	// }, 1000);
}

function changeView(view) {
	$('.page.active').removeClass('active');
	$('#page-' + view).addClass('active');
}

function toggleMenu() {
	$('body').toggleClass('menu-open');
}

function showChatMessage(data) {
	var bubble = $('<div class="chat-message"><b>' + data.from + ':</b><br>' + data.message + '</div>');

	$('.chat-messages').prepend(bubble);

	setTimeout(function () {
		bubble.fadeOut(function () {
			bubble.remove();
		});
	}, 5000);
}
