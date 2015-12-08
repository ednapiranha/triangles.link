'use strict';

const should = require('should');
const child = require('child_process');

const server = require('../').getServer();

const rooms = require('../lib/rooms');
const shared = require('./shared');

let socket = shared.socket();

after(() => {
  child.exec('rm -rf ./test/db/rooms ./test/db/users');
  server.stop(() => {
    console.log('server stopped');
  });
});

describe('builder', () => {
  it('should get all items', (done) => {
    let data = {
      room: 'test'
    };

    rooms.get(data.room, (err) => {
      if (err) {
        throw err;
      }

      socket.on('connect', () => {
        socket.emit('join', data);
        socket.emit('build', data);
        socket.on('build', function (d) {
          should.exist(d);
          done();
        });
      });
    });
  });
});
