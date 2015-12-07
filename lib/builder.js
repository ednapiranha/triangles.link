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
  },
  'neon-sun': {
    name: 'sun',
    requirements: {
      'neon-pink': 1,
      'neon-red': 1,
      'neon-green': 1
    }
  },
  'neon-clouds': {
    name: 'clouds',
    requirements: {
      'neon-blue': 4
    }
  },
  'neon-hand': {
    name: 'hand',
    requirements: {
      'neon-red': 2,
      'neon-pink': 1,
      'neon-sun': 1
    }
  },
  'neon-fish': {
    name: 'fish',
    requirements: {
      'neon-clouds': 1,
      'neon-sun': 1
    }
  },
  'neon-cat-1': {
    name: 'cat 1',
    requirements: {
      'neon-sun': 1,
      'neon-fish': 1,
      'neon-hand': 1
    }
  },
  'neon-hammer': {
    name: 'hammer',
    requirements: {
      'neon-palm-tree': 1,
      'neon-hand': 2
    }
  },
  'neon-nails': {
    name: 'nails',
    requirements: {
      'neon-hammer': 1,
      'neon-hand': 1
    }
  },
  'neon-dog-1': {
    name: 'dog 1',
    requirements: {
      'neon-sun': 1,
      'neon-cat-1': 1,
      'neon-hand': 1
    }
  }
};

exports.getItems = function (data, io) {
  io.sockets.in(data.room).emit('build', items);
};
