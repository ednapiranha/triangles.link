'use strict';

(function () {
  //var playground = document.querySelector('#playground');
  var snap;

  snap = Snap(50, 50);
  playground = Snap('#playground');

  Snap.load('/assets/square-blue.svg', function (fragment) {
    snap.append(fragment);
    snap.attr({ class: 'square' });
    playground.append(snap);
    playground.drag();
  });

  var mining = document.querySelector('#mining-area');
  var vehicle = document.querySelector('#vehicle');
  vehicle.style.left = '100px';
  vehicle.style.right = 0;
})();
