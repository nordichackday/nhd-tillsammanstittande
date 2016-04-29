import $    from 'jquery';

import template from 'client/components/chat/template.hbs';
import message  from 'client/components/chat/message.hbs';

let messageId = 1;

const initialize = () => {
  const content = template({});
  $('#page-video-chat-container').html(content);
};

const bindDomEvents = (socket) => {

  const $button = $('.chat-button');
  const $input  = $('.chat-input');

  const onChatButtonClick = (event) => {
  	event.preventDefault();
  	// var message = prompt('Chat');
  	$input.toggleClass('visible').focus();
  }

  const onChatInputKeyDown = (event) => {

    if (event.keyCode === 13) {
      const message = $input.val();

      if (message) {
        socket.emit('write', message);
      }

      $input.val('');
    }
  };

  $button.click(onChatButtonClick);
  $input.keydown(onChatInputKeyDown);
};


const bindSocketEvents = (socket) => {

  const appendMessage = (data) => {
    data.id = messageId++;

  	const content = message(data);
  	$('.chat-messages').prepend(content);

    const element = $('#message-' + data.id);
  	setTimeout(() => {
  		element.fadeOut(() => {
  			element.remove();
  		});
  	}, 5000);
  };

  socket.on('chat', (data) => appendMessage(data));
};

export default function (socket) {
  initialize();
  bindDomEvents(socket);
  bindSocketEvents(socket);
};
