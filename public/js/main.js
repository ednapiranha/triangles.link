'use strict';

require('../css/shared.css');
require('../css/main.css');

const ws = require('./ws');
const background = require('./background');
const playground = require('./playground');
const menu = require('./menu');

const owner = document.body.getAttribute('data-owner');
const user = document.body.getAttribute('data-user');
const footer = document.querySelector('footer');

const socket = io();

menu.generate();
ws.assignRoom(socket);
if (user !== 'undefined') {
  ws.setChat(socket);
} else {
  footer.classList.add('hide');
}
background.generateSky();
background.generateMountain();
background.generateLand();
background.generateMining();
ws.getCollection(socket);

if (owner === 'true') {
  ws.setMining(socket);
  playground.setVehicle(socket);
  ws.getBuildables(socket);
}
