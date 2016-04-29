import $    from 'jquery';

import content        from './template.hbs';
import chatMessage    from './chat-message.hbs';
import generalMessage from './general-message.hbs';
import emojiMessage   from './emoji-message.hbs';

const templates = {
  content,
  chatMessage,
  generalMessage,
  emojiMessage
};

// TODO: messages from chat server should contain unique id.

const initialize = () => {
  const content = templates.content({});
  $('#page-video-chat-container').html(content);
};

const bindDomEvents = (socket) => {

  const $button = $('.chat-button');
  const $input  = $('.chat-input');
  const $emoji  = $('.chat-emojis .emoji');

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
    }
  };

  const onEmojiClick = (event) => {
    console.log($(event.currentTarget).html());
    socket.emit('emoji', $(event.currentTarget).html());
  };

  $button.click(onChatButtonClick);
  $input.keydown(onChatInputKeyDown);
  $emoji.click(onEmojiClick);
};


const bindSocketEvents = (socket) => {

  const addMessage = (template, data) => {

    const content = template(data);
    $('.chat-messages').prepend(content);

    const element = $('.chat-messages .message').get(0);
    setTimeout(() => {
      $(element).fadeOut(() => {
        $(element).remove();
      });
    }, 5000);
  };


  socket.on('chat', (data) => {
    addMessage(templates.chatMessage, data);
  });

  socket.on('emoji', (data) => {
    addMessage(templates.emojiMessage, data);
  });

  socket.on('user-join', (data)  => {
    const message = `${data.user} kom in.`;
    addMessage(templates.generalMessage, {message});
  });

  socket.on('user-leave', function (data) {
    const message = `${data.user} lämnade.`;
    addMessage(templates.generalMessage, {message});
  });
};

export default function (socket) {
  initialize();
  bindDomEvents(socket);
  bindSocketEvents(socket);
};