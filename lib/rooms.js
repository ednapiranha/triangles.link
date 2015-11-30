'use strict';

const db = require('./db').register('rooms');

exports.get = function (uid, next) {
  db.get(uid, function(err, room) {
    console.log('room: ', room);
    if (err || !room) {
      let roomData = {
        id: uid
      };

      db.put(uid, roomData, function(err) {
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
