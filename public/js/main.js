'use strict';

require('../css/shared.css');
require('../css/main.css');

const ws = require('./ws');
let level = parseInt(document.body.getAttribute('data-level'), 10);
let background;

if (!isNaN(level) && level > 0) {
  if (level > 1) {
    level = 1;
  }
  background = require('./background-' + level);
} else {
  background = require('./background');
}
const playground = require('./playground');
const menu = require('./menu');

const owner = document.body.getAttribute('data-owner');

const socket = io();

menu.generate();
ws.assignRoom(socket);
/*
if (user === 'undefined') {
  ws.setChat(socket);
}
*/
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
