'use strict';

const concat = require('concat-stream');

const db = require('./db').register('rooms');

// grid 24 x 26
const gridTotalVal = 24 * 26;
let gridTotal = [];

for (let y = 0; y < 26; y++) {
  for (let x = 0; x < 24; x++) {
    gridTotal.push({
      x: (x * 100) + 'px',
      y: (y * 50) + 'px'
    });
  }
}

exports.get = function (uid, next) {
  db.get('room!' + uid, (err, room) => {
    if (err || !room) {
      let roomData = {
        id: uid
      };

      db.put('room!' + uid, roomData, (err) => {
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

exports.generateMining = function (uid) {
  // generate a set of items to mine for every hour for a room
  let assignedGrids = {};

  let gridItems = [
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
      item: 'square-green.svg',
      name: 'neon-green'
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

exports.getHealth = function (data, io) {
  db.get('health!' + data.room, (err, health) => {
    if (err || isNaN(health)) {
      health = 5;
    }

    io.sockets.in(data.room).emit('damage', health);
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
      console.log('added health');
      io.sockets.in(uid).emit('damage', health);
    });
  });
};

exports.getCollection = function (data, io) {
  db.get('collected!' + data.room, (err, collected) => {
    if (err) {
      return console.log(err);
    }
    io.sockets.in(data.room).emit('collection', collected);
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
        console.log('finished batch ', collected);
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
