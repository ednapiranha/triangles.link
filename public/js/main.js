'use strict';

require('../css/shared.css');
require('../css/main.css');

const ws = require('./ws');
const background = require('./background');
const playground = require('./playground');
const menu = require('./menu');

const owner = document.body.getAttribute('data-owner');

const socket = io();

menu.generate();
ws.assignRoom(socket);
ws.setChat(socket);
background.generateSky();
background.generateMountain();
background.generateLand();
background.generateMining();

if (owner === 'true') {
  ws.setMining(socket);
  playground.setVehicle(socket);
  ws.getCollection(socket);
}
