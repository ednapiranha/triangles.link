'use strict';

const conf = require('nconf');
const should = require('should');
const io = require('socket.io-client');

conf.argv().env().file({ file: 'test/local.json' });

const HOST = 'http://127.0.0.1:' + conf.get('port');

const wsOpts = {
  transports: ['websocket'],
  'force new connection': true,
  'reconnection delay': 0,
  'reopen delay': 0
};

let socket = io.connect(HOST, wsOpts);

exports.socket = function () {
  return socket;
};

exports.HOST = function () {
  return HOST;
};