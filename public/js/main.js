'use strict';

require('../css/shared.css');
require('../css/main.css');

const ws = require('./ws');
let background;
if (document.location.href.indexOf('?moon') > -1) {
  background = require('./background-moon');
} else {
  background = require('./background');
}
const playground = require('./playground');
const menu = require('./menu');

const owner = document.body.getAttribute('data-owner');
// const user = document.body.getAttribute('data-user');

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
