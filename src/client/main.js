import chatComponent        from 'client/components/chat';
import menuComponent        from 'client/components/menu';
import videoPlayerComponent from 'client/components/video-player';

import $ from 'jquery';

const socket = io('http://localhost:4000');
const $users = $('#users');

const chat = chatComponent(socket);
const menu = menuComponent(socket);

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
