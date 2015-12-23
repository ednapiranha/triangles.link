/* eslint-env node */

'use strict';

const Hapi = require('hapi');
const Joi = require('joi');
const http = require('http');
const Inert = require('inert');
const moment = require('moment');
const SocketIO = require('socket.io');
const cron = require('node-schedule');
const Blankie = require('blankie');
const Scooter = require('scooter');
const Statehood = require('statehood');

const conf = require('./lib/conf');

const authenticate = require('./lib/authenticate');
const services = require('./lib/services');
const rooms = require('./lib/rooms');
const builder = require('./lib/builder');

const server = new Hapi.Server();

let io;
let users = 0;

rooms.getAllRooms((err, rms) => {
  rms.forEach((room) => {
    rooms.generateMining(room.id);
    // mining items regeneration
    cron.scheduleJob('0,30 * * * *', () => {
      console.log('rengenerating items ... ', room.id);
      rooms.generateMining(room.id);
    });

    // vehicle health regeneration
    cron.scheduleJob('0,15,30,45 * * * *', () => {
      console.log('rengenerating health ... ', room.id);
      rooms.addHealth(room.id, io);
    });
  });
});

server.connection({
  host: conf.get('domain'),
  port: conf.get('port')
});

server.ext('onPreResponse', (request, reply) => {
  let response = request.response;

  if (!response.isBoom) {
    return reply.continue();
  }

  let error = response;
  let ctx = {};

  let message = error.output.payload.message;
  let statusCode = error.output.statusCode || 500;
  ctx.code = statusCode;
  ctx.httpMessage = http.STATUS_CODES[statusCode].toLowerCase();

  switch (statusCode) {
    case 404:
      ctx.reason = 'page not found';
      break;
    case 403:
      ctx.reason = 'forbidden';
      break;
    case 500:
      ctx.reason = 'something went wrong';
      break;
    default:
      break;
  }

  if (process.NODE_ENV !== 'production') {
    //console.log(error.stack || error);
  }

  if (ctx.reason) {
    // Use actual message if supplied
    ctx.reason = message || ctx.reason;
    return reply.view('error', ctx).code(statusCode);
  }

  ctx.reason = message.replace(/\s/gi, '+');
  reply.redirect(request.path + '?err=' + ctx.reason);
});

let skip = function () {
  return false;
};

let auth = {
  mode: 'try',
  strategy: 'session'
};

if (process.env.NODE_ENV === 'test') {
  skip = function () {
    return true;
  };
}

server.register([
  {
    register: Inert
  },
  {
    register: require('vision')
  },
  {
    register: require('crumb'),
    options: {
      skip: skip
    }
  },
  {
    register: require('hapi-cache-buster'),
    options: new Date().getTime().toString()
  }
], (err) => {
  if (err) {
    console.log(err);
  }

  server.views({
    engines: {
      jade: require('jade')
    },
    isCached: process.env.node === 'production',
    path: __dirname + '/views',
    compileOptions: {
      pretty: true
    }
  });
});
/*
server.register([Scooter,
  {
    register: Blankie,
    options: {
      defaultSrc: 'self',
      connectSrc: ['ws:', 'wss:', 'self'],
      scriptSrc: 'self',
      styleSrc: ['self', 'unsafe-inline']
    }
  }
], (err) => {
  if (err) {
    throw err;
  }
});
*/
server.register(require('hapi-auth-cookie'), (err) => {
  if (err) {
    throw err;
  }

  server.auth.strategy('session', 'cookie', {
    password: conf.get('password'),
    ttl: conf.get('session-ttl'),
    cookie: conf.get('cookie'),
    keepAlive: true,
    isSecure: false
  });
});

let stateDefn = new Statehood.Definitions({
  encoding: 'iron',
  password: conf.get('password'),
  ttl: conf.get('session-ttl'),
  isSecure: false
});

const routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: services.home,
      auth: auth
    }
  },
  {
    method: 'GET',
    path: '/about',
    handler: services.about
  },
  {
    method: 'GET',
    path: '/signup',
    handler: services.join
  },
  {
    method: 'GET',
    path: '/password/forgot',
    handler: services.forgotPassword
  },
  {
    method: 'GET',
    path: '/password/reset',
    handler: services.resetPassword
  },
  {
    method: 'POST',
    path: '/password/forgot',
    handler: authenticate.forgotPassword
  },
  {
    method: 'POST',
    path: '/password/reset',
    handler: authenticate.resetPassword
  },
  {
    method: 'POST',
    path: '/signup',
    config: {
      handler: authenticate.signup,
      validate: {
        payload: {
          email: Joi.string().email(),
          password: Joi.string().min(6).required()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/dashboard',
    config: {
      handler: services.dashboard,
      auth: auth,
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: '/'
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/t/{uid}',
    config: {
      handler: services.room,
      auth: auth
    }
  },
  {
    method: 'GET',
    path: '/login',
    handler: services.home
  },
  {
    method: 'POST',
    path: '/login',
    config: {
      handler: authenticate.login,
      auth: auth,
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      },
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/settings',
    config: {
      handler: services.profile,
      auth: auth,
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: '/'
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/settings',
    config: {
      handler: authenticate.update,
      auth: auth,
      validate: {
        payload: {
          name: Joi.string().required(),
          world: Joi.any().optional(),
          password: Joi.any().optional()
        }
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: '/'
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/user/{uid}',
    config: {
      handler: services.user,
      auth: auth
    }
  },
  {
    method: 'GET',
    path: '/logout',
    config: {
      handler: authenticate.logout,
      auth: auth,
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: '/'
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/worlds',
    config: {
      handler: services.worlds,
      auth: auth
    }
  }
];

server.route(routes);

server.route({
  path: '/{p*}',
  method: 'GET',
  handler: {
    directory: {
      path: './build',
      listing: false,
      index: false
    }
  }
});

server.start(function (err) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  function disconnectHandler() {
    users--;

    if (users < 0) {
      users = 0;
    }

    io.emit('active', users);
  }

  io = SocketIO.listen(server.listener);

  let testMode = !!(process.env.NODE_ENV === 'test');

  io.set('authorization', (handshake, next) => {
    if (handshake.headers.cookie) {
      console.log('got here!! ', handshake.headers.cookies)
      stateDefn.parse(handshake.headers.cookie, (err, state) => {
        if (state && state.secret) {
          let session = state.secret.uid;

          if (session) {
            handshake.headers.uid = session;
            console.log('++++++++++ ', handshake.headers);
            return next(null, true);
          }
        }
      });
    }

    next(null, true);
  });

  io.on('connection', (socket) => {
    socket.on('disconnect', disconnectHandler);

    socket.on('join', (data) => {
      users++;
      socket.join(data.room);
      console.log('joined ', data.room);
      io.emit('active', users);
    });

    socket.on('message', (data) => {
      data.created = moment().format('HH:mm:ss');
      io.sockets.in(data.room).emit('message', data);
    });

    socket.on('mining', (data) => {
      if (!testMode && socket.handshake.headers.uid !== data.room) {
        return;
      }
      rooms.getMining(data, io);
    });

    socket.on('mined', (data) => {
      if (!testMode && socket.handshake.headers.uid !== data.room) {
        return;
      }
      rooms.setMinedItem(data, io);
    });

    socket.on('collection', (data) => {
      rooms.getCollection(data, io);
    });

    socket.on('build', (data) => {
      if (!testMode && socket.handshake.headers.uid !== data.room) {
        return;
      }
      builder.getItems(data, io);
    });

    socket.on('make', (data) => {
      if (!testMode && socket.handshake.headers.uid !== data.room) {
        return;
      }
      rooms.makeItems(data, io);
    });

    socket.on('displayables', (data) => {
      rooms.getDisplayables(data, io);
    });

    socket.on('display', (data) => {
      rooms.setToDisplay(data, io);
    });

    socket.on('saveDisplay', (data) => {
      console.log(socket.handshake.headers, data.room)
      if (!testMode && socket.handshake.headers.uid !== data.room) {
        return;
      }
      rooms.saveDisplayPos(data, io);
    });

    socket.on('damage', (data) => {
      rooms.getHealth(data, io);
    });

    socket.on('undisplay', (data) => {
      rooms.undisplay(data, io);
    });
  });
});

// called during tests
exports.getServer = function() {
  return server;
};
