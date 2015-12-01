'use strict';

require('../css/main.css');

const ws = require('./ws');
const background = require('./background');
const playground = require('./playground');
const menu = require('./menu');

const socket = io();

menu.generate();
ws.assignRoom(socket);
ws.setChat(socket);
ws.setMining(socket);
background.generateSky();
background.generateLand();
background.generateMining();
playground.setVehicle(socket);

