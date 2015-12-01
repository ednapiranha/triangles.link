'use strict';

let currentRoom = document.body.getAttribute('data-room');

exports.setVehicle = function (socket) {
  let snap;

  /*
  playground = Snap('#playground');

  Snap.load('/assets/square-blue.svg', function (fragment) {
    snap = Snap(50, 50);
    snap.append(fragment);
    snap.attr({ class: 'square' });
    playground.append(snap);
    playground.drag();
  });

  Snap.load('/assets/vehicle.svg', function (fragment) {
    snap = Snap(100, 50);
    snap.append(fragment);
    snap.attr({ class: 'vehicle' });
    playground.append(snap);
    playground.drag();
  });
  */
  let mining = document.querySelector('#mining-area');
  let vehicle = document.querySelector('#vehicle');
  let hole = document.querySelector('.hole');
  let activeVehicle = false;
  vehicle.style.left = 0;
  vehicle.style.top = 0;

  vehicle.onclick = function () {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
      activeVehicle = false;
    } else {
      this.classList.add('active');
      activeVehicle = true;
    }
  };

  document.onkeydown = checkArrowKey;

  function checkArrowKey(ev) {
    ev = ev || window.event;

    switch (ev.keyCode) {
      case 38:
        ev.preventDefault();
        verifyMove('up');
        break;
      case 40:
        ev.preventDefault();
        verifyMove('down');
        break;
      case 37:
        ev.preventDefault();
        verifyMove('left');
        break;
      case 39:
        ev.preventDefault();
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
        setTimeout(function () {
          mining.removeChild(hc);
        }, 2000);
      }, 4000);
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
          if (currX < 2300) {
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
