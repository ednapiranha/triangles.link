'use strict';

const items = {
  'neon-green': {
    name: 'neon green',
    requirements: {
      'neon-blue': 2
    }
  },
  'neon-red': {
    name: 'neon red',
    requirements: {
      'neon-pink': 2
    }
  },
  'neon-purple': {
    name: 'neon purple',
    requirements: {
      'neon-blue': 1,
      'neon-red': 1,
    }
  },
  'neon-palm-tree': {
    name: 'palm tree',
    requirements: {
      'neon-green': 3,
      'neon-blue': 1
    }
  },
  'neon-lips': {
    name: 'lips',
    requirements: {
      'neon-pink': 3,
      'neon-red': 1
    }
  }
};

exports.getItems = function (data, io) {
  io.sockets.in(data.room).emit('build', items);
};
