import menu from 'client/components/menu';

const socket = io('http://localhost:4000');
const $users = $('#users');

menu(socket);

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
	// 	playVideo();
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

function playVideo() {
	var videoId = '1372168-001A';

	console.log('trying to start video');

	if (window.SVP) {
		console.log('SVP found');

		SVP.config({
			useAltDashUrl: false,
			useAltHlsUrl: false,
			splash: false,
			theme: 'standard'
		});

		var element = document.getElementById('videoplayer'),
			videoElement = element.getElementsByTagName('video')[0];

		videoElement.setAttribute('preload', 'auto'),
		videoElement.setAttribute('autoplay', ''),
		videoElement.setAttribute('data-video-reduced-bandwidth', 'true'),
		videoElement.setAttribute('data-video-id', videoId);

		var position = 600;
		if (position) {
			videoElement.setAttribute('data-video-startposition', position);
		}

		if (element.state && element.state()) {
			console.log('Change video to ' + videoId);
			element.load(videoId);
		} else {
			console.log('Init player with video ' + videoId);
			window.SVP(element);
		}
	}
}
