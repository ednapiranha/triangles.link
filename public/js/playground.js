'use strict';

let currentRoom = document.body.getAttribute('data-room');
let firstTime = document.querySelector('.arrow-content');
let health = document.querySelector('#health');
let isDamaged = false;

exports.setHealth = function (socket) {
  socket.emit('damage', {
    room: currentRoom
  });

  socket.on('damage', (data) => {
    for (let i = 5; i > 0; i--) {
      if (data === 0) {
        isDamaged = true;
      } else {
        isDamaged = false;
      }

      if (i <= data) {
        health.querySelector('#health-state' + i).classList.remove('damage');
      } else {
        health.querySelector('#health-state' + i).classList.add('damage');
      }
    }
  });
};

exports.setVehicle = function (socket) {
  let mining = document.querySelector('#mining-area');
  let vehicle = document.querySelector('#vehicle');
  let hole = document.querySelector('.hole');
  let activeVehicle = false;
  vehicle.style.left = 0;
  vehicle.style.top = 0;

  exports.setHealth(socket);

  socket.on('damage', (data) => {
    isDamaged = !data;
    if (isDamaged) {
      vehicle.classList.add('damage');
    } else {
      vehicle.classList.remove('damage');
    }
  });

  vehicle.onclick = function () {
    if (firstTime) {
      firstTime.classList.add('remove');
    }
    if (!isDamaged) {
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        activeVehicle = false;
      } else {
        this.classList.add('active');
        activeVehicle = true;
      }
    } else {
      console.log('vehicle damaged');
    }
  };

  document.onkeydown = checkArrowKey;

  function checkArrowKey(ev) {
    ev = ev || window.event;

    if (isDamaged) {
      vehicle.classList.remove('active');
      return;
    }

    switch (ev.keyCode) {
      case 38:
        ev.preventDefault();
        vehicle.classList.remove('left');
        vehicle.classList.remove('down');
        vehicle.classList.add('up');
        verifyMove('up');
        break;
      case 40:
        ev.preventDefault();
        vehicle.classList.remove('left');
        vehicle.classList.remove('up');
        vehicle.classList.add('down');
        verifyMove('down');
        break;
      case 37:
        ev.preventDefault();
        vehicle.classList.remove('up');
        vehicle.classList.remove('down');
        vehicle.classList.add('left');
        verifyMove('left');
        break;
      case 39:
        ev.preventDefault();
        vehicle.classList.remove('up');
        vehicle.classList.remove('down');
        vehicle.classList.remove('left');
        verifyMove('right');
        break;
      default:
        break;
    }
  }

  function verifyMove(direction) {
    let currX = parseInt(vehicle.style.left.split('px')[0], 10);
    let currY = parseInt(vehicle.style.top.split('px')[0], 10);
    let holeClone;

    function fadeOut(hc) {
      setTimeout(function () {
        hc.classList.add('fade');
        setTimeout(() => {
          mining.removeChild(hc);
        }, 1400);
      }, 1000);
    }

    if (activeVehicle) {
      switch (direction) {
        case 'up':
          if (currY > 0) {
            vehicle.style.top = (currY - 50) + 'px';
          }
          break;
        case 'down':
          if (currY < 1250) {
            vehicle.style.top = (currY + 50) + 'px';
          }
          break;
        case 'left':
          if (currX > 0) {
            vehicle.style.left = (currX - 100) + 'px';
          }
          break;
        case 'right':
          if (currX < 1100) {
            vehicle.style.left = (currX + 100) + 'px';
          }
          break;
        default:
          break;
      }

      holeClone = hole.cloneNode();
      holeClone.classList.remove('fade');
      holeClone.style.top = vehicle.style.top;
      holeClone.style.left = vehicle.style.left;

      socket.emit('mining', {
        room: currentRoom,
        currX: vehicle.style.left,
        currY: vehicle.style.top
      });

      fadeOut(holeClone);
      mining.appendChild(holeClone);
    }
  }
};

exports.setDamagedState = function (damage) {
  isDamaged = damage;
};
