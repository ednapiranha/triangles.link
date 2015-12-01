'use strict';

const db = require('./db').register('rooms');

exports.get = function (uid, next) {
  db.get(uid, (err, room) => {
    console.log('room: ', room);
    if (err || !room) {
      let roomData = {
        id: uid
      };

      db.put(uid, roomData, (err) => {
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

exports.generateMining = function (uid) {
  // generate a set of items to mine for every hour
};

exports.getMining = function (data, io) {
  // get current mining item if any
  console.log(data.room, data.currX, data.currY)
  io.sockets.in(data.room).emit('mining', true);
};
