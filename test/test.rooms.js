'use strict';

const should = require('should');
const child = require('child_process');

const server = require('../').getServer();

const rooms = require('../lib/rooms');
const shared = require('./shared');

let selectedItem1 = {
  name: 'neon-blue',
  currX: 100,
  currY: 100
};

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
      Object.keys(grid).length.should.equal(17);
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

  it('should mine an item', (done) => {
    let gridTotal = rooms.gridDimensions();
    let data = {
      room: 'test'
    };

    function checkMined(grid) {
      // valid position
      let g = Object.keys(grid)[0];
      data.name = 'neon-blue';
      data.x = gridTotal[g].x;
      data.y = gridTotal[g].y;

      socket.emit('mined', data);
      socket.on('mined', (d) => {
        should.exist(d);
        socket.disconnect();
        done();
      });
    }

    let socket = shared.socket();
    socket.emit('join', data);

    setImmediate(() => {
      rooms.generateMining(data.room, (err, grid) => {
        checkMined(grid);
      });
    });
  });

  it('should not mine an item', (done) => {
    let data = {
      room: 'test',
      name: 'neon-star'
    };

    function checkMined() {
      socket.emit('mined', data);
      socket.on('mined', (d) => {
        d.should.equal(false);
        socket.disconnect();
        done();
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
    let data = {
      room: 'test'
    };

    let socket = shared.socket();
    socket.emit('join', data);
    socket.emit('collection', data);
    socket.on('collection', (d) => {
      should.exist(d);
      socket.disconnect();
      done();
    });
  });

  it('should set to display an item', (done) => {
    let data = {
      room: 'test',
      item: selectedItem1.name,
      x: selectedItem1.currX,
      y: selectedItem1.currY
    };

    function display() {
      socket.emit('display', data);
      socket.on('display.pass', (d) => {
        should.exist(d);
        d[selectedItem1.name].x.should.equal(data.x);
        d[selectedItem1.name].y.should.equal(data.y);
        socket.emit('undisplay', data);
        socket.disconnect();
        done();
      });
    }

    let socket = shared.socket();
    socket.emit('join', data);
    display();
  });

  it('should not display an item', (done) => {
    let data = {
      room: 'test',
      item: 'lava',
      x: '100px',
      y: '100px'
    };

    function display() {
      socket.emit('display', data);
      socket.on('display.fail', (d) => {
        d.should.equal(false);
        socket.disconnect();
        done();
      });
    }

    let socket = shared.socket();
    socket.emit('join', data);
    display();
  });

  it('should save the displayable position', (done) => {
    let data = {
      room: 'test',
      item: selectedItem1.name,
      x: 200,
      y: 300,
      z: 50,
      w: '300px',
      h: '300px'
    };

    let socket = shared.socket();
    socket.emit('join', data);
    socket.emit('saveDisplay', data);

    socket.on('test.saveDisplay', (d) => {
      should.exist(d);
      d[selectedItem1.name].x.should.equal(data.x);
      d[selectedItem1.name].y.should.equal(data.y);
      d[selectedItem1.name].z.should.equal(data.z);
      d[selectedItem1.name].w.should.equal(data.w);
      d[selectedItem1.name].h.should.equal(data.h);
      socket.disconnect();
      done();
    });
  });

  it('should save the displayable position with a valid x/y', (done) => {
    let data = {
      room: 'test',
      item: selectedItem1.name,
      x: 'scale(3.5, 3.5) skew(20deg,  -15deg)',
      y: 'scale(3.5, 3.5) skew(20deg,  -15deg)',
      z: 50,
      w: '300px',
      h: '300px'
    };

    let socket = shared.socket();
    socket.emit('join', data);
    socket.emit('saveDisplay', data);

    socket.on('test.saveDisplay', (d) => {
      should.exist(d);
      d[selectedItem1.name].x.should.equal(100);
      d[selectedItem1.name].y.should.equal(100);
      d[selectedItem1.name].z.should.equal(data.z);
      d[selectedItem1.name].w.should.equal(data.w);
      d[selectedItem1.name].h.should.equal(data.h);
      socket.disconnect();
      done();
    });
  });

  it('should undisplay', (done) => {
    let data = {
      room: 'test',
      item: selectedItem1.name,
      x: 200,
      y: 300,
      z: 50,
      w: '300px',
      h: '300px'
    };

    let socket = shared.socket();
    socket.emit('join', data);
    socket.emit('undisplay', data);
    setImmediate(() => {
      socket.on('display', (d) => {
        should.not.exist(d['neon-pink']);
        socket.disconnect();
        done();
      });
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

    setImmediate(() => {
      socket.on('purchasable', (d) => {
        d.should.equal(true);
        socket.disconnect();
        done();
      });
    });
  });

  it('should not be purchasable', (done) => {
    let data = {
      room: 'test',
      requirements: {
        'neon-pink': 50
      }
    };

    let socket = shared.socket();
    socket.emit('join', data);
    socket.emit('make', data);

    setImmediate(() => {
      socket.on('purchasable', (d) => {
        d.should.equal(false);
        socket.disconnect();
        done();
      });
    });
  });
});
