'use strict';

const items = {
  'neon-yellow': {
    name: 'neon yellow',
    requirements: {
      'neon-blue': 2
    }
  },
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
  'neon-martini': {
    name: 'martini',
    requirements: {
      'neon-green': 2,
      'neon-red': 1
    }
  },
  'neon-lips': {
    name: 'lips',
    requirements: {
      'neon-pink': 3,
      'neon-red': 1
    }
  },
  'neon-eyeglasses': {
    name: 'eyeglasses',
    requirements: {
      'neon-purple': 2,
      'neon-green': 1
    }
  },
  'neon-sun': {
    name: 'sun',
    requirements: {
      'neon-pink': 1,
      'neon-red': 1,
      'neon-yellow': 1
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
  'neon-cat-2': {
    name: 'cat 2',
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
  },
  'neon-dog-2': {
    name: 'dog 2',
    requirements: {
      'neon-sun': 1,
      'neon-cat-2': 1,
      'neon-hand': 1
    }
  },
  'neon-fire': {
    name: 'fire',
    requirements: {
      'neon-sun': 2,
      'neon-hand': 1,
      'neon-yellow': 1
    }
  },
  'neon-triangle-1': {
    name: 'triangle 1',
    requirements: {
      'neon-fire': 2,
      'neon-nails': 2,
      'neon-hammer': 2
    }
  },
  'neon-triangle-2': {
    name: 'triangle 2',
    requirements: {
      'neon-fire': 2,
      'neon-nails': 3,
      'neon-hammer': 2
    }
  },
  'neon-triangle-3': {
    name: 'triangle 3',
    requirements: {
      'neon-triangle-1': 2,
      'neon-triangle-2': 2,
      'neon-hammer': 1
    }
  },
  'neon-star': {
    name: 'star',
    requirements: {
      'neon-triangle-1': 3,
      'neon-triangle-2': 3,
      'neon-triangle-3': 2
    }
  },
  'neon-portal-1': {
    name: 'portal level 1',
    portal: true,
    level: 1,
    requirements: {
      'neon-star': 5,
      'neon-fire': 2
    }
  }
};

exports.getItems = function (data, io) {
  io.sockets.in(data.room).emit('build', items);
};
