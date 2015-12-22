'use strict';

const concat = require('concat-stream');

const db = require('./db').register('rooms');

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
  // generate a set of items to mine for every hour for a room
  let assignedGrids = {};

  let gridItems = [
    {
      item: 'square-pink.svg',
      name: 'neon-pink'
    },
    {
      item: 'square-pink.svg',
      name: 'neon-pink'
    },
    {
      item: 'square-blue.svg',
      name: 'neon-blue'
    },
    {
      item: 'square-pink.svg',
      name: 'neon-pink'
    },
    {
      item: 'square-blue.svg',
      name: 'neon-blue'
    },
    {
      item: 'square-pink.svg',
      name: 'neon-pink'
    },
    {
      item: 'square-blue.svg',
      name: 'neon-blue'
    },
    {
      item: 'square-blue.svg',
      name: 'neon-blue'
    },
    {
      item: 'square-blue.svg',
      name: 'neon-blue'
    },
    {
      item: 'square-blue.svg',
      name: 'neon-blue'
    },
    {
      item: 'square-pink.svg',
      name: 'neon-pink'
    },
    {
      item: 'lava.svg',
      name: 'lava'
    },
    {
      item: 'lava.svg',
      name: 'lava'
    },
    {
      item: 'lava.svg',
      name: 'lava'
    },
    {
      item: 'lava.svg',
      name: 'lava'
    }
  ];

  gridItems = shuffleArray(gridItems);

  function assignGrid() {
    return Math.floor(Math.random() * (gridTotalVal - 2) + 1) + 2;
  }

  while (gridItems.length > 0 || Object.keys(assignedGrids).length < 15) {
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
        if (gridTotal[parseInt(key, 10)].x == data.currX &&
            gridTotal[parseInt(key, 10)].y == data.currY) {
          io.sockets.in(data.room).emit('mining', {
            item: grid[key].item,
            name: grid[key].name,
            currX: data.currX,
            currY: data.currY
          });
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
      return;
    }

    // remove from saved list
    db.get('grid!' + data.room, (err, grid) => {
      if (err) {
        return console.log(err);
      }

      for (let key in grid) {
        if (grid[key].name == data.name) {
          // found item, delete from grid and save to collection if it isn't lava
          delete grid[key];

          db.put('grid!' + data.room, grid, (err) => {
            if (err) {
              console.log(err);
            }
          });

          if (data.name !== 'lava') {
            saveCollected();
          } else {
            saveDamage(health);
          }

          break;
        }
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
      return console.log(err);
    }

    if (collected[data.item] && collected[data.item] > 0) {
      db.get('displayed!' + data.room, (err, displayed) => {
        if (err || !displayed) {
          displayed = {};
        }

        displayed[data.item] = {
          x: data.x,
          y: data.y,
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

            io.sockets.in(data.room).emit('display', displayed);
            io.sockets.in(data.room).emit('collection', collected);
          });
        });
      });
    }

    if (!collected[data.item] || collected[data.item] < 1) {
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

exports.saveDisplayPos = function (data, io) {
  db.get('displayed!' + data.room, (err, displayed) => {
    if (err) {
      return console.log(err);
    }

    displayed[data.item] = {
      x: data.x,
      y: data.y,
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

          if (process.env.NODE_ENV === 'test') {
            return io.sockets.in(data.room).emit('test.undisplay', displayed);
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
    if (err) {
      return console.log(err);
    }

    for (let req in data.requirements) {
      if (collected[req] < 1) {
        break;
      }

      if (collected[req] < data.requirements[req]) {
        purchasable = false;
        console.log('NOT purchasable');
        if (process.env.NODE_ENV === 'test') {
          io.sockets.in(data.room).emit('test.notPurchasable', false);
        }
        break;
      }
    }

    if (purchasable) {
      for (let req in data.requirements) {
        collected[req] = collected[req] - data.requirements[req];
      }

      if (!collected[data.item]) {
        collected[data.item] = 0;
      }

      collected[data.item] += 1;

      db.put('collected!' + data.room, collected);

      if (process.env.NODE_ENV === 'test') {
        io.sockets.in(data.room).emit('test.purchasable', true);
      }
    }
  });
};
