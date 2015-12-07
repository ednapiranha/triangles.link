'use strict';

const playground = require('./playground');

let currentRoom = document.body.getAttribute('data-room');
let username = document.body.getAttribute('data-user');
let mining = document.querySelector('#mining-area');
let builder = document.querySelector('#builder');
let collection = document.querySelector('#collection');
let playgroundEl = document.querySelector('#playground');
let avatar = document.querySelector('#avatar');
let build = document.querySelector('#build');
let items = collection.querySelector('.items') || false;
let displayItems = collection.querySelector('.displayed');
const owner = document.body.getAttribute('data-owner');
let currentItems = {};

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
      message: input.value,
      name: username
    });

    input.value = '';
  };

  socket.on('message', (data) => {
    let msg = document.createElement('li');
    let time = document.createElement('time');
    let span = document.createElement('span');
    time.textContent = data.created;
    span.textContent = data.name + ': ' + data.message;
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
      item.classList.add(data.name);
      item.style.left = data.currX;
      item.style.top = data.currY;
      mining.appendChild(item);
      socket.emit('mined', {
        room: currentRoom,
        name: data.name
      });
      socket.emit('collection', {
        room: currentRoom
      });
      setTimeout(() => {
        mining.removeChild(item);
      }, 2000);
    }
  });

  playground.setHealth(socket);
};

exports.getCollection = function (socket) {
  socket.emit('collection', {
    room: currentRoom
  });

  socket.emit('display', {
    room: currentRoom
  });

  socket.emit('displayables', {
    room: currentRoom
  });

  socket.on('collection', (data) => {
    currentItems = data;
    drawInventory();
    socket.emit('build', {
      room: currentRoom
    });
  });

  function drawInventory() {
    if (items) {
      items.innerHTML = '';
      for (let item in currentItems) {
        let li = document.createElement('li');
        let p = document.createElement('p');
        p.classList.add(item);
        p.classList.add('collected');
        p.textContent = 'x' + currentItems[item];

        if (currentItems[item] > 0) {
          li.onclick = function () {
            drawDisplayable(item, 100, 100);
            socket.emit('display', {
              room: currentRoom,
              item: item,
              x: 100,
              y: 100
            });
          };
        }

        li.appendChild(p);
        items.appendChild(li);
      }
    }
  }

  function drawDisplayable(item, x, y) {
    if (!playgroundEl.querySelector('.' + item)) {
      let displayable = document.createElement('div');
      displayable.classList.add(item);
      displayable.classList.add('display');
      displayable.style.left = x + 'px';
      displayable.style.top = y + 'px';

      if (owner === 'true') {
        let draggable = new Draggabilly(displayable);
        draggable.on('dragEnd', (ev, pointer) => {
          socket.emit('saveDisplay', {
            room: currentRoom,
            item: item,
            x: draggable.position.x,
            y: draggable.position.y
          });
        });
      }
      playgroundEl.appendChild(displayable);
    }
  }

  socket.on('displayables', (data) => {
    playgroundEl.innerHTML = '';
    for (let d in data) {
      drawDisplayable(d, data[d].x, data[d].y);
    }
  });

  socket.on('display', (data) => {
    displayItems.innerHTML = '';

    for (let display in data) {
      let li = document.createElement('li');
      let p = document.createElement('p');
      p.classList.add(display);
      p.classList.add('collected');
      li.onclick = function () {
        socket.emit('undisplay', {
          room: currentRoom,
          item: display
        });
      };

      li.appendChild(p);
      displayItems.appendChild(li);
    }
  });

  avatar.onclick = function () {
    socket.emit('collection', {
      room: currentRoom
    });
    builder.classList.remove('active');
    build.classList.remove('active');
    if (collection.classList.contains('active')) {
      this.classList.remove('active');
      collection.classList.remove('active');
    } else {
      this.classList.add('active');
      collection.classList.add('active');
      drawInventory();
    }
  };
};

exports.getBuildables = function (socket) {
  let build = document.querySelector('#build');
  let items = builder.querySelector('.items');

  build.onclick = function () {
    socket.emit('build', {
      room: currentRoom
    });
    collection.classList.remove('active');
    avatar.classList.remove('active');
    if (builder.classList.contains('active')) {
      this.classList.remove('active');
      builder.classList.remove('active');
    } else {
      this.classList.add('active');
      builder.classList.add('active');
    }
  };

  socket.on('build', (data) => {
    let disabled = false;
    items.innerHTML = '';

    for (let item in data) {
      let li = document.createElement('li');
      let p = document.createElement('p');
      p.classList.add('build');
      p.classList.add(item);
      p.setAttribute('title', data[item].name);
      li.appendChild(p);

      for (let key in data[item].requirements) {
        p = document.createElement('p');

        if (!currentItems[key] || currentItems[key] < data[item].requirements[key]) {
          p.classList.add('disabled');
          disabled = true;
        }

        p.classList.add('requirements');
        p.classList.add(key);
        p.textContent = 'x' + data[item].requirements[key];
        li.appendChild(p);
      }

      if (!disabled) {
        li.classList.add('buy');
        li.onclick = function () {
          socket.emit('make', {
            room: currentRoom,
            item: item,
            requirements: data[item].requirements
          });

          items.innerHTML = '';
          socket.emit('collection', {
            room: currentRoom
          });
        };
      }

      items.appendChild(li);
      disabled = false;
    }
  });
};
