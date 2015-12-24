'use strict';

const should = require('should');
const child = require('child_process');

const server = require('../').getServer();

const rooms = require('../lib/rooms');
const shared = require('./shared');

let gridObj;
let selectedItem1 = {
  name: 'neon-blue'
};
let selectedItem2 = {
  name: 'neon-pink',
  currX: 100,
  currY: 100
};

function emitData(dt, socket) {
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
      Object.keys(gridObj).length.should.equal(17);
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

    let socket = shared.socket();
    socket.emit('join', data);

    for (let g in gridObj) {
      gridTotalObj[gridTotal[g].x + gridTotal[g].y] = true;
      data.currX = gridTotal[g].x;
      data.currY = gridTotal[g].y;
      emitData(data, socket);
    }

    socket.on('mining', function (d) {
      should.exist(d);
      should.exist(gridTotalObj[d.currX + d.currY]);
      count++;

      if (count === Object.keys(gridObj).length) {
        socket.disconnect();
        done();
      }
    });
  });

  it('should mine an item', (done) => {
    let count = 0;
    let data = {
      room: 'test',
      name: 'neon-blue'
    };

    function checkMined() {
      socket.emit('mined', data);
      socket.on('mined', function (d) {
        should.exist(d);
        count++;
        data.name = 'neon-pink';
        socket.emit('mined', data);
        socket.on('mined', function (d) {
          should.exist(d);
          if (count === 2) {
            socket.disconnect();
            done();
          }
        });
      });
    }

    let socket = shared.socket();
    socket.emit('join', data);

    setImmediate(() => {
      rooms.generateMining(data.room, () => {
        checkMined();
      });
    });
  });

  it('should get the collection', (done) => {
    let count = 0;
    let data = {
      room: 'test'
    };

    let socket = shared.socket();
    socket.emit('join', data);
    socket.emit('collection', data);
    socket.on('collection', function (d) {
      count++;
      should.exist(d);
      if (count === 1) {
        socket.disconnect();
        done();
      }
    });
  });

  it('should set to display an item and get displayables', (done) => {
    let data = {
      room: 'test',
      item: selectedItem2.name,
      x: selectedItem2.currX,
      y: selectedItem2.currY,
      z: 50,
      w: 100,
      h: 100
    };

    let socket = shared.socket();
    socket.emit('join', data);
    socket.emit('display', data);
    socket.on('display', function (d) {
      should.exist(d);
      d['neon-pink'].x.should.equal(data.x);
      d['neon-pink'].y.should.equal(data.y);
      d['neon-pink'].z.should.equal(data.z);
      d['neon-pink'].w.should.equal(data.w);
      d['neon-pink'].h.should.equal(data.h);
      socket.disconnect();
      done();
    });
  });

  it('should save the displayable position', (done) => {
    let data = {
      room: 'test',
      item: selectedItem2.name,
      x: '200px',
      y: '300px',
      z: 50,
      w: 300,
      h: 300
    };

    let socket = shared.socket();
    socket.emit('join', data);
    socket.emit('saveDisplay', data);
    socket.on('test.saveDisplay', (d) => {
      should.exist(d);
      d['neon-pink'].x.should.equal(data.x);
      d['neon-pink'].y.should.equal(data.y);
      d['neon-pink'].z.should.equal(data.z);
      d['neon-pink'].w.should.equal(data.w);
      d['neon-pink'].h.should.equal(data.h);
      socket.disconnect();
      done();
    });
  });

  it('should undisplay', (done) => {
    let data = {
      room: 'test',
      item: 'neon-pink',
      x: '200px',
      y: '300px',
      z: 50,
      w: 300,
      h: 300
    };

    let socket = shared.socket();
    socket.emit('join', data);
    socket.emit('undisplay', data);
    socket.on('display', (d) => {
      should.not.exist(d['neon-pink']);
      socket.disconnect();
      done();
    });
  });

  it('should be purchasable', (done) => {
    let data = {
      room: 'test',
      requirements: {
        'neon-pink': 1
      }
    };

    let socket = shared.socket();
    socket.emit('join', data);
    socket.emit('make', data);
    socket.on('purchasable', (d) => {
      d.should.equal(true);
      socket.disconnect();
      done();
    });
  });

  it('should not be purchasable', (done) => {
    let data = {
      room: 'test',
      requirements: {
        'neon-pink': 100
      }
    };

    let socket = shared.socket();
    socket.emit('join', data);
    socket.emit('make', data);
    socket.on('purchasable', (d) => {
      d.should.equal(false);
      socket.disconnect();
      done();
    });
  });
});
