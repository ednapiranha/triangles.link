'use strict';

exports.generate = function () {
  let menuButton = document.querySelector('header p');
  let menu = document.querySelector('#menu');

  menuButton.onclick = function() {
    if (this.classList.contains('active')) {
      menu.classList.remove('active');
      this.classList.remove('active');
    } else {
      menu.classList.add('active');
      this.classList.add('active');
    }
  };
};
