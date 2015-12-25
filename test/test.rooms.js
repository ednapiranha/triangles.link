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
let selectedItem2 = {
  name: 'neon-pink',
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
    let count = 0;
    let data = {
      room: 'test'
    };

    let socket = shared.socket();
    socket.emit('join', data);
    socket.emit('collection', data);
    socket.on('collection', (d) => {
      count++;
      should.exist(d);
      if (count === 1) {
        socket.disconnect();
        done();
      }
    });
  });

  it('should set to display an item', (done) => {
    let count = 0;

    let data = {
      room: 'test',
      item: selectedItem1.name,
      x: selectedItem1.currX + 'px',
      y: selectedItem1.currY + 'px'
    };

    function display() {
      socket.emit('display', data);
      socket.on('display', (d) => {
        count++;
        should.exist(d);
        d[selectedItem1.name].x.should.equal(data.x);
        d[selectedItem1.name].y.should.equal(data.y);

        if (count > 0) {
          socket.disconnect();
          done();
        }
      });
    }

    let socket = shared.socket();
    socket.emit('join', data);
    socket.emit('collection', data);

    socket.on('collection', () => {
      display();
    });
  });

  it('should not display an item', (done) => {
    let count = 0;

    let data = {
      room: 'test',
      item: 'lava',
      x: '100px',
      y: '100px'
    };

    function display() {
      socket.emit('display', data);
      socket.on('display', (d) => {
        count++;
        d.should.equal(false);

        if (count > 0) {
          socket.disconnect();
          done();
        }
      });
    }

    let socket = shared.socket();
    socket.emit('join', data);
    socket.emit('collection', data);

    socket.on('collection', () => {
      display();
    });
  });

  it('should save the displayable position', (done) => {
    let data = {
      room: 'test',
      item: selectedItem1.name,
      x: '200px',
      y: '300px',
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

  it('should undisplay', (done) => {
    let data = {
      room: 'test',
      item: selectedItem1.name,
      x: '200px',
      y: '300px',
      z: 50,
      w: 300,
      h: 300
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
        'neon-pink': 100
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
