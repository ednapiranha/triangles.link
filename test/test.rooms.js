'use strict';

const should = require('should');
const child = require('child_process');

const server = require('../').getServer();

const rooms = require('../lib/rooms');
const shared = require('./shared');

let socket = shared.socket();
let gridObj;
let selectedItem1;
let selectedItem2;

function emitData(dt) {
  socket.emit('mining', dt);
}

after(() => {
  child.exec('rm -rf ./test/db/rooms ./test/db/users');
  server.stop(() => {
    console.log('server stopped');
  });
});

describe('rooms', () => {
  it('should create and get room', (done) => {
    let data = {
      room: 'test'
    };

    rooms.get(data.room, (err, room) => {
      if (err) {
        throw err;
      }

      should.exist(room);
      room.id.should.equal(data.room);
      done();
    });
  });

  it('should generate a mining grid', (done) => {
    rooms.generateMining('test', (err, grid) => {
      gridObj = grid;
      Object.keys(gridObj).length.should.equal(15);
      done();
    });
  });

  it('should get all available rooms', (done) => {
    rooms.getAllRooms((err, rms) => {
      if (err) {
        throw err;
      }

      should.exist(rms);
      rms.length.should.equal(1);
      done();
    });
  });

  it('should get mining for grid area', (done) => {
    let data = {
      room: 'test'
    };

    let gridTotal = rooms.gridDimensions();
    let gridTotalObj = {};
    let count = 0;

    socket.emit('join', data);

    for (let g in gridObj) {
      gridTotalObj[gridTotal[g].x + gridTotal[g].y] = true;
      data.currX = gridTotal[g].x;
      data.currY = gridTotal[g].y;
      emitData(data);
    }

    socket.on('mining', function (d) {
      should.exist(d);
      should.exist(gridTotalObj[d.currX + d.currY]);
      if (d.name === 'neon-blue') {
        selectedItem1 = d;
      } else if (d.name === 'neon-pink') {
        selectedItem2 = d;
      }
      count++;

      if (count === Object.keys(gridObj).length) {
        done();
      }
    });
  });

  it('should mine an item', (done) => {
    let count = 0;
    let data = {
      room: 'test',
      name: selectedItem1.name
    };

    socket.emit('mined', data);
    socket.on('mined', function (d) {
      should.exist(d);
      count++;
      data.name = selectedItem2.name;
      socket.emit('mined', data);
      socket.on('mined', function (d) {
        should.exist(d);
        if (count == 2) {
          done();
        }
      });
    });
  });

  it('should get the collection', (done) => {
    let count = 0;
    let data = {
      room: 'test'
    };

    socket.emit('collection', data);
    socket.on('collection', function (d) {
      count++;
      should.exist(d);
      if (count === 1) {
        done();
      }
    });
  });

  it('should set to display an item and get displayables', (done) => {
    let data = {
      room: 'test',
      item: selectedItem2.name,
      x: selectedItem2.currX,
      y: selectedItem2.currY
    };

    socket.emit('display', data);
    socket.on('display', function (d) {
      should.exist(d);
      d[selectedItem2.name].x.should.equal(data.x);
      d[selectedItem2.name].y.should.equal(data.y);
      done();
    });
  });

});
