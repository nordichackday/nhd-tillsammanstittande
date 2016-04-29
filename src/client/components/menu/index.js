import Chance   from 'chance';
import $        from 'jquery';
import template from 'client/components/menu/template.hbs'

const chance  = new Chance();
const user    = {};

user.name = chance.name();

export default function (socket) {

  // set menu content
  const content = template({user});
  $('#menu-container').html(content);

  // bind .user click update name
  $('#menu .user').click(() => {
    const name = prompt('What’s your name?');

    $('.username').text(name);
    socket.emit('username', name);
  });

  socket.on('connect', () => {
    $('.username').text(user.name);
    $('.user').show();

    socket.emit('username', user.name);
  });
};
