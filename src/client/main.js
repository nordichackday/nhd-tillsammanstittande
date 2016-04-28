var socket = io('http://localhost:4000');

var $users = $('#users');

socket.on('list', function (data) {
	console.log('User list: ', data);

	$(data.users).each(function (index) {
		$users.append('<li><b>' + this.name + '</b><br>Tittar på: ' + this.watching.title + 	'</li>');
	});
});


$('.placeholder').click(function () {
	// $(this).css({
	// 	left: -200
	// });

	// $users.css({
	// 	right: 0
	// });

	$('body').addClass('menu-open');
});
