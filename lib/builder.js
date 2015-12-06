'use strict';

const items = {
  'neon-green': {
    name: 'neon green',
    requirements: {
      'neon-blue': 2
    }
  },
  'palm-tree': {
    name: 'palm tree',
    requirements: {
      'neon-green': 3,
      'neon-blue': 1
    }
  }
};

exports.getItems = function (data, io) {
  io.sockets.in(data.room).emit('build', items);
};
