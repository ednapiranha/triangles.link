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
let notification = document.querySelector('#notification');
const owner = document.body.getAttribute('data-owner');
let closeWin = document.querySelector('#close-window');
let currentItems = {};
let displayableItems = {};

function setNotification(msg) {
  notification.textContent = msg;
  notification.classList.add('active');
  setTimeout(() => {
    notification.classList.remove('active');
    notification.classList.remove('danger');
  }, 5000);
}

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

  if (messageForm) {
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
  }
};

exports.setMining = function (socket) {
  let active = document.querySelector('#active');

  socket.on('active', (data) => {
    active.querySelector('span').textContent = data;
  });

  socket.on('mining', (data) => {
    if (data.item) {
      let item = document.createElement('div');
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

      if (data.name === 'lava') {
        notification.classList.add('danger');
        setNotification('Oh no! You found ' + data.name + '!');
      } else {
        notification.classList.remove('danger');
        setNotification('You found ' + data.name + '!');
      }

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
        let span = document.createElement('span');
        p.classList.add(item);
        p.classList.add('collected');
        span.textContent = 'x' + currentItems[item];
        p.appendChild(span);

        if (currentItems[item] > 0) {
          li.classList.add('displayable');
        }

        if (currentItems[item] > 0 && !displayableItems[item]) {
          li.onclick = () => {
            setNotification('You added a displayable ' + item);
            // this.classList.remove('displayable');
            drawDisplayable(item, 100, 100);
            socket.emit('display', {
              room: currentRoom,
              item: item,
              x: 100,
              y: 100,
              w: 100,
              h: 100
            });
          };
        }

        li.appendChild(p);
        items.appendChild(li);
      }
    }
  }

  function dragMoveListener(event) {
    let target = event.target;
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  window.dragMoveListener = dragMoveListener;

  function drawDisplayable(item, x, y, w, h) {
    if (!playgroundEl.querySelector('.' + item)) {
      let displayable = document.createElement('div');
      displayable.classList.add(item);
      displayable.classList.add('display');
      displayable.style.webkitTransform = displayable.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      displayable.setAttribute('data-x', x);
      displayable.setAttribute('data-y', y);
      displayable.style.width = w || 100;
      displayable.style.height = h || 100;

      if (owner === 'true') {
        interact(displayable).draggable({
          inertia: false,
          restrict: {
            restriction: 'parent',
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
          },
          onmove: dragMoveListener,
          onend: (event) => {
            let target = event.target;

            socket.emit('saveDisplay', {
              room: currentRoom,
              item: item,
              x: target.getAttribute('data-x'),
              y: target.getAttribute('data-y'),
              w: target.style.width,
              h: target.style.height
            });
          }
        }).resizable({
          preserveAspectRatio: true,
          edges: { left: true, right: true, bottom: true, top: true }
        }).on('resizemove', (event) => {
          let target = event.target;
          let x = (parseFloat(target.getAttribute('data-x')) || 0);
          let y = (parseFloat(target.getAttribute('data-y')) || 0);

          // update the element's style
          target.style.width = event.rect.width + 'px';
          target.style.height = event.rect.height + 'px';

          // translate when resizing from top or left edges
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          target.style.webkitTransform = target.style.transform =
              'translate(' + x + 'px,' + y + 'px)';

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
          socket.emit('saveDisplay', {
            room: currentRoom,
            item: item,
            x: target.getAttribute('data-x'),
            y: target.getAttribute('data-y'),
            w: target.style.width,
            h: target.style.height
          });
        });
      }
      playgroundEl.appendChild(displayable);
    }
  }

  socket.on('displayables', (data) => {
    displayableItems = data;
    playgroundEl.innerHTML = '';
    for (let d in data) {
      drawDisplayable(d, data[d].x, data[d].y, data[d].w || 100, data[d].h || 100);
    }
  });

  socket.on('display', (data) => {
    if (displayItems) {
      displayItems.innerHTML = '';
      displayableItems = data;
      for (let display in data) {
        let li = document.createElement('li');
        let p = document.createElement('p');
        p.classList.add(display);
        p.classList.add('collected');
        li.onclick = function () {
          setNotification('You removed a displayable ' + display);
          socket.emit('undisplay', {
            room: currentRoom,
            item: display
          });
          delete displayableItems[display];
        };

        li.classList.add('displayable');
        li.appendChild(p);
        displayItems.appendChild(li);
      }
    }
  });

  if (avatar) {
    closeWin.onclick = function () {
      builder.classList.remove('active');
      build.classList.remove('active');
      collection.classList.remove('active');
      this.classList.remove('active');
    };

    avatar.onclick = function () {
      socket.emit('collection', {
        room: currentRoom
      });
      builder.classList.remove('active');
      build.classList.remove('active');
      if (collection.classList.contains('active')) {
        closeWin.click();
      } else {
        this.classList.add('active');
        collection.classList.add('active');
        closeWin.classList.add('active');
        drawInventory();
      }
    };
  }
};

exports.getBuildables = function (socket) {
  let build = document.querySelector('#build');
  let items = builder.querySelector('.items') || false;

  if (!items) {
    return;
  }

  build.onclick = function () {
    socket.emit('build', {
      room: currentRoom
    });
    collection.classList.remove('active');
    avatar.classList.remove('active');
    if (builder.classList.contains('active')) {
      closeWin.click();
    } else {
      this.classList.add('active');
      builder.classList.add('active');
      closeWin.classList.add('active');
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
          setNotification('Successfully built ' + item);
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
