'use strict';

(function() {
  var socket = io();
  var currentRoom = document.body.getAttribute('data-room');
  var username = document.body.getAttribute('data-user');

  if (currentRoom && currentRoom !== 'undefined') {
    console.log('joining ', currentRoom);
    socket.emit('join', {
      room: currentRoom
    });
  } else {
    console.log('no room available');
  }

  var messageForm = document.querySelector('#message');
  var messages = document.querySelector('#messages');

  messageForm.onsubmit = function (ev) {
    ev.preventDefault();

    var input = this.querySelector('input');

    socket.emit('message', {
      room: currentRoom,
      message: input.value
    });

    input.value = '';
  };

  socket.on('message', function (data) {
    var msg = document.createElement('li');
    var time = document.createElement('time');
    var span = document.createElement('span');
    time.textContent = data.created;
    span.textContent = username + ': ' + data.message;
    msg.appendChild(time);
    msg.appendChild(span);
    messages.appendChild(msg);
    msg.onclick = function () {
      msg.classList.add('hide');

      setTimeout(function () {
        messages.removeChild(msg);
      }, 600);
    };
  });

  var active = document.querySelector('#active');

  socket.on('active', function (data) {
    active.textContent = data;
  });
})();
