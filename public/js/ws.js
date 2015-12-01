'use strict';

let currentRoom = document.body.getAttribute('data-room');
let username = document.body.getAttribute('data-user');
let mining = document.querySelector('#mining-area');

exports.assignRoom = function (socket) {
  if (currentRoom && currentRoom !== 'undefined') {
    console.log('joining ', currentRoom);
    socket.emit('join', {
      room: currentRoom
    });
  } else {
    console.log('no room available');
  }
};

exports.setChat = function (socket) {
  let messageForm = document.querySelector('#message');
  let messages = document.querySelector('#messages');

  messageForm.onsubmit = function (ev) {
    ev.preventDefault();

    let input = this.querySelector('input');

    socket.emit('message', {
      room: currentRoom,
      message: input.value
    });

    input.value = '';
  };

  socket.on('message', (data) => {
    let msg = document.createElement('li');
    let time = document.createElement('time');
    let span = document.createElement('span');
    time.textContent = data.created;
    span.textContent = username + ': ' + data.message;
    msg.appendChild(time);
    msg.appendChild(span);
    messages.appendChild(msg);
    msg.onclick = function () {
      msg.classList.add('hide');

      setTimeout(() => {
        messages.removeChild(msg);
      }, 600);
    };
  });
};

exports.setMining = function (socket) {
  let active = document.querySelector('#active');

  socket.on('active', (data) => {
    active.textContent = data;
  });

  socket.on('mining', (data) => {
    if (data.item) {
      let item = document.createElement('img');
      item.classList.add('neon');
      item.style.left = data.currX;
      item.style.top = data.currY;
      mining.appendChild(item);
    }
  });
};
