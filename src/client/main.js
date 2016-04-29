import chatComponent        from 'client/components/chat';
import menuComponent        from 'client/components/menu';
import videoPlayerComponent from 'client/components/video-player';

import $ from 'jquery';
import _ from 'lodash';

// TODO this url should be injected via a ENV variable e.g. PROCESS.ENV.SOCKET_URL
const url      = "nhd-tillsammanstittnade-socket.herokuapp.com";
const socket   = io(url);
const $users   = $('#users');

const chat = chatComponent(socket);
const menu = menuComponent(socket);

const videoPlayer = videoPlayerComponent(socket);

let shouldHideControllers = false;
const hideVideoControllers = _.debounce(() => {
	if (shouldHideControllers) {
		$('body').addClass('hide-ui');
	}
}, 2000);

socket.on('list', (data) => {
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

$users.on('click', 'li', () => {
	const room = $(this).data('room');

	switchRoom(room);
});

$('.imagelogo').click(() => {
	changeView('start');
});

$('.friends-button').click((event) => {
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

	setTimeout(() => {
		videoPlayer.play();
		socket.emit('mock');
		shouldHideControllers = true;

		hideVideoControllers();
	}, 2000);
}

$('body').on('mousemove', () => {
	$('body').removeClass('hide-ui');

	hideVideoControllers();
});

$('.chat').on('mouseover', () => {
	shouldHideControllers = false;
}).on('mouseout', function () {
	shouldHideControllers = true;

	hideVideoControllers();
});

function changeView(view) {
	$('.page.active').removeClass('active');
	$('#page-' + view).addClass('active');
}

function toggleMenu() {
	$('body').toggleClass('menu-open');
}
