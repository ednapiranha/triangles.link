'use strict';

const concat = require('concat-stream');

const db = require('./db').register('rooms');

const DISALLOWED_ITEMS = ['lava', 'hole'];

// grid 12 x 26
const gridTotalVal = 12 * 26;
let gridTotal = [];

for (let y = 0; y < 26; y++) {
  for (let x = 0; x < 12; x++) {
    gridTotal.push({
      x: (x * 100) + 'px',
      y: (y * 50) + 'px'
    });
  }
}

exports.gridDimensions = function () {
  return gridTotal;
};

exports.update = function (uid, opts, next) {
  db.get('room!' + uid, (err, room) => {
    if (err) {
      return next(err);
    }

    for (let k in opts) {
      if (k !== 'id') {
        room[k] = opts[k];
      }
    }

    db.put('room!' + uid, room, (err) => {
      if (err) {
        return next(err);
      }

      next(null, true);
    });
  });
};

exports.get = function (uid, next) {
  db.get('room!' + uid, (err, room) => {
    if (err || !room) {
      let roomData = {
        id: uid
      };

      let opts = [
        {
          type: 'put',
          key: 'room!' + uid,
          value: roomData
        },
        {
          type: 'put',
          key: 'health!' + uid,
          value: 5
        }
      ];

      db.batch(opts, (err) => {
        if (err) {
          return next(err);
        }

        next(null, roomData);
      });
    } else {
      next(null, room);
    }
  });
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

exports.generateMining = function (uid, next) {
  // generate a set of items to mine for every 15 min for a room
  let assignedGrids = {};

  let gridItems = [];

  for (let i = 0; i < 6; i++) {
    gridItems.push({
      item: 'square.svg',
      name: 'neon-pink'
    });
  }

  for (let i = 0; i < 7; i++) {
    gridItems.push({
      item: 'square.svg',
      name: 'neon-blue'
    });
  }

  for (let i = 0; i < 4; i++) {
    gridItems.push({
      item: 'lava.svg',
      name: 'lava'
    });
  }

  function updateGrid() {
    gridItems = shuffleArray(gridItems);

    function assignGrid() {
      return Math.floor(Math.random() * (gridTotalVal - 2) + 1) + 2;
    }

    while (gridItems.length > 0 || Object.keys(assignedGrids).length < gridItems.length) {
      gridItems.forEach((grid, idx) => {
        let currentGridPos = assignGrid();

        if (!assignedGrids[currentGridPos]) {
          assignedGrids[currentGridPos] = grid;
          gridItems.splice(idx, 1);
        }
      });
    }

    db.put('grid!' + uid, assignedGrids, (err) => {
      if (err) {
        console.log(err);
      }

      if (process.env.NODE_ENV === 'test' && next) {
        next(null, assignedGrids);
      }
    });
  }

  // get user items to see if they have any portals
  let levelStatus = 0;

  db.get('collected!' + uid, (err, collected) => {
    if (!err) {
      for (let k in collected) {
        if (k.match(/^neon-portal/)) {
          levelStatus = parseInt(k.split('portal-')[1], 10);
          break;
        }
      }

      switch (levelStatus) {
        case 1:
          for (let i = 0; i < 3; i++) {
            gridItems.push({
              item: 'star.svg',
              name: 'neon-star'
            });
          }
          break;
        default:
          break;
      }

      updateGrid();
    } else {
      updateGrid();
    }
  });
};

exports.getAllRooms = function (next) {
  let rs = db.createValueStream({
    gte: 'room!',
    lte: 'room!\xff'
  });

  rs.pipe(concat((rooms) => {
    return next(null, rooms);
  }));

  rs.on('error', (err) => {
    return next(err);
  });
};

exports.addHealth = function (uid, io) {
  db.get('health!' + uid, (err, health) => {
    if (err || isNaN(health)) {
      // if this doesn't exist, it must be new
      health = 5;
    }

    health++;

    if (health > 5) {
      health = 5;
    }

    db.put('health!' + uid, health, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log('added health ');
      io.sockets.in(uid).emit('damage', health);
    });
  });
};

exports.getHealth = function (data, io) {
  db.get('health!' + data.room, (err, health) => {
    if (err || isNaN(health)) {
      health = 5;
    }

    io.sockets.in(data.room).emit('damage', health);
  });
};

exports.getMining = function (data, io) {
  db.get('health!' + data.room, (err, health) => {
    if (health === 0) {
      io.sockets.in(data.room).emit('damage', health);
      return;
    }

    db.get('grid!' + data.room, (err, grid) => {
      if (err) {
        return console.log(err);
      }

      for (let key in grid) {
        try {
          if (gridTotal[parseInt(key, 10)].x == data.currX &&
              gridTotal[parseInt(key, 10)].y == data.currY) {
            io.sockets.in(data.room).emit('mining', {
              item: grid[key].item,
              name: grid[key].name,
              currX: data.currX,
              currY: data.currY
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  });
};

exports.setMinedItem = function (data, io) {
  function saveCollected() {
    db.get('collected!' + data.room, (err, collected) => {
      if (err || !collected) {
        collected = {};
      }

      if (!collected[data.name]) {
        collected[data.name] = 0;
      }

      collected[data.name] = collected[data.name] + 1;

      db.put('collected!' + data.room, collected, (err) => {
        if (err) {
          return console.log(err);
        }

        // currently only used during testing
        io.sockets.in(data.room).emit('mined', collected);
      });
    });
  }

  function saveDamage(health) {
    health--;

    if (health < 0) {
      health = 0;
    }

    db.put('health!' + data.room, health, (err) => {
      if (err) {
        return console.log(err);
      }

      io.sockets.in(data.room).emit('damage', health);
    });
  }

  db.get('health!' + data.room, (err, health) => {
    if (err || isNaN(health)) {
      health = 5;
    }

    if (health === 0) {
      io.sockets.in(data.room).emit('damage', health);
    }

    // remove from saved list
    db.get('grid!' + data.room, (err, grid) => {
      let found = false;

      if (err) {
        return console.log(err);
      }

      for (let key in grid) {
        if (grid[key].name == data.name &&
            gridTotal[parseInt(key, 10)].x == data.x &&
            gridTotal[parseInt(key, 10)].y == data.y) {
          // found item, delete from grid and save to collection if it isn't lava
          delete grid[key];

          db.put('grid!' + data.room, grid, (err) => {
            if (err) {
              console.log(err);
            }

            if (data.name !== 'lava') {
              saveCollected();
            } else {
              saveDamage(health);
            }
          });

          found = true;

          break;
        }
      }

      if (!found) {
        io.sockets.in(data.room).emit('mined', false);
      }
    });
  });
};

exports.getCollection = function (data, io) {
  db.get('collected!' + data.room, (err, collected) => {
    if (err) {
      io.sockets.in(data.room).emit('collection', {});
      return console.error('no inventory items');
    }

    io.sockets.in(data.room).emit('collection', collected);
  });
};

exports.setToDisplay = function (data, io) {
  db.get('collected!' + data.room, (err, collected) => {
    if (err) {
      db.put('collected!' + data.room, {});
      collected = {};
    }

    if (collected[data.item] && collected[data.item] > 0) {
      db.get('displayed!' + data.room, (err, displayed) => {
        if (err || !displayed) {
          displayed = {};
        }

        let posX = parseInt(data.x, 10);
        let posY = parseInt(data.y, 10);

        if (isNaN(posX)) {
          posX = 100;
        }

        if (isNaN(posY)) {
          posY = 100;
        }

        displayed[data.item] = {
          x: posX,
          y: posY,
          z: 50,
          w: 100,
          h: 100
        };

        db.put('displayed!' + data.room, displayed, (err) => {
          if (err) {
            return console.log(err);
          }

          collected[data.item] -= 1;

          db.put('collected!' + data.room, collected, (err) => {
            if (err) {
              return console.log(err);
            }

            io.sockets.in(data.room).emit('display.pass', displayed);
            io.sockets.in(data.room).emit('display', displayed);
            io.sockets.in(data.room).emit('collection', collected);
          });
        });
      });
    }

    if (!collected[data.item] || collected[data.item] < 1) {
      if (DISALLOWED_ITEMS.indexOf(data.item) > -1) {
        io.sockets.in(data.room).emit('display.fail', false);
      }
      db.put('collected!' + data.room, collected, (err) => {
        if (err) {
          return console.log(err);
        }

        io.sockets.in(data.room).emit('collection', collected);
      });
    }
  });
};

exports.getDisplayables = function (data, io) {
  db.get('displayed!' + data.room, (err, displayed) => {
    if (err) {
      db.put('displayed!' + data.room, {}, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    if (displayed) {
      io.sockets.in(data.room).emit('display', displayed);
      io.sockets.in(data.room).emit('displayables', displayed);
    }
  });
};

exports.deleteWorld = function (uid) {
  let opts = [
    {
      type: 'del',
      key: 'displayed!' + uid
    },
    {
      type: 'del',
      key: 'collected!' + uid
    },
    {
      type: 'del',
      key: 'health!' + uid
    },
    {
      type: 'del',
      key: 'grid!' + uid
    },
    {
      type: 'del',
      key: 'room!' + uid
    }
  ];

  db.batch(opts, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('deleted profile for ', uid);
    }

    return true;
  });
};

exports.saveDisplayPos = function (data, io) {
  db.get('displayed!' + data.room, (err, displayed) => {
    if (err) {
      return console.log(err);
    }

    let width = parseInt(data.w.split('px')[0], 10);
    let height = parseInt(data.h.split('px')[0], 10);
    let posX = parseInt(data.x, 10);
    let posY = parseInt(data.y, 10);

    if (width > 1000) {
      data.w = '1000px';
    } else if (width < 50) {
      data.w = '50px';
    }

    if (height > 1000) {
      data.h = '1000px';
    } else if (height < 50) {
      data.h = '50px';
    }

    if (isNaN(posX)) {
      posX = 100;
    }

    if (isNaN(posY)) {
      posY = 100;
    }

    displayed[data.item] = {
      x: posX,
      y: posY,
      z: 50,
      w: data.w,
      h: data.h
    };

    db.put('displayed!' + data.room, displayed, (err) => {
      if (err) {
        return console.log(err);
      }

      if (process.env.NODE_ENV === 'test') {
        io.sockets.in(data.room).emit('test.saveDisplay', displayed);
      }
    });
  });
};

exports.undisplay = function (data, io) {
  db.get('displayed!' + data.room, (err, displayed) => {
    if (err) {
      return console.log(err);
    }

    if (displayed && displayed[data.item]) {
      delete displayed[data.item];

      db.get('collected!' + data.room, (err, collected) => {
        if (err) {
          return console.log(err);
        }

        if (!collected[data.item]) {
          collected[data.item] = 0;
        }

        collected[data.item] += 1;

        let opts = [
          {
            type: 'put',
            key: 'collected!' + data.room,
            value: collected
          },
          {
            type: 'put',
            key: 'displayed!' + data.room,
            value: displayed
          }
        ];

        db.batch(opts, (err) => {
          if (err) {
            return console.log(err);
          }

          io.sockets.in(data.room).emit('collection', collected);
          io.sockets.in(data.room).emit('display', displayed);
          io.sockets.in(data.room).emit('displayables', displayed);
        });
      });
    }
  });
};

exports.makeItems = function (data, io) {
  let purchasable = true;

  db.get('collected!' + data.room, (err, collected) => {
    if (err || Object.keys(collected).length < 1) {
      return console.log(err);
    }

    for (let req in data.requirements) {
      if (collected[req] < 1) {
        break;
      }

      if (collected[req] && collected[req] < data.requirements[req]) {
        purchasable = false;
        io.sockets.in(data.room).emit('purchasable', false);
        break;
      }
    }

    if (purchasable) {
      for (let req in data.requirements) {
        collected[req] = collected[req] - data.requirements[req];
        if (collected[req] < 0) {
          return io.sockets.in(data.room).emit('purchasable', false);
        }
      }

      if (!collected[data.item]) {
        collected[data.item] = 0;
      }

      collected[data.item] += 1;

      if (data.item && data.item.match(/^neon-portal/)) {
        let levelStatus = parseInt(data.item.split('portal-')[1], 10);

        if (levelStatus > 1) {
          levelStatus = 1;
        }

        exports.update(data.room, {
          level: levelStatus
        }, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }

      db.put('collected!' + data.room, collected);

      io.sockets.in(data.room).emit('purchasable', true);
    }
  });
};
