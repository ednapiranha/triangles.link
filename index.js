/* eslint-env node */

'use strict';

const Hapi = require('hapi');
const Joi = require('joi');
const http = require('http');
const Inert = require('inert');
const moment = require('moment');
const SocketIO = require('socket.io');

const conf = require('./lib/conf');

const authenticate = require('./lib/authenticate');
const services = require('./lib/services');
const rooms = require('./lib/rooms');

const server = new Hapi.Server();

server.connection({
  host: conf.get('domain'),
  port: conf.get('port')
});

server.ext('onPreResponse', (request, reply) => {
  var response = request.response;

  if (!response.isBoom) {
    return reply.continue();
  }

  var error = response;
  var ctx = {};

  var message = error.output.payload.message;
  var statusCode = error.output.statusCode || 500;
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

  if (process.env.npm_lifecycle_event === 'dev') {
    console.log(error.stack || error);
  }

  if (ctx.reason) {
    // Use actual message if supplied
    ctx.reason = message || ctx.reason;
    return reply.view('error', ctx).code(statusCode);
  }

  ctx.reason = message.replace(/\s/gi, '+');
  reply.redirect(request.path + '?err=' + ctx.reason);
});

server.register([
  {
    register: Inert
  },
  {
    register: require('vision')
  },
  {
    register: require('crumb')
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

const auth = {
  mode: 'try',
  strategy: 'session'
};

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
    path: '/profile',
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
    path: '/profile',
    config: {
      handler: authenticate.update,
      auth: auth,
      validate: {
        payload: {
          name: Joi.string().required(),
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

let io;
let users = 0;

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

  io.on('connection', (socket) => {
    socket.on('disconnect', disconnectHandler);

    socket.on('join', (data) => {
      users++;
      socket.join(data.room);
      io.emit('active', users);
    });

    socket.on('message', (data) => {
      data.created = moment().format('HH:mm:ss');
      io.sockets.in(data.room).emit('message', data);
    });

    socket.on('mining', (data) => {
      rooms.getMining(data, io);
    });

    socket.on('mined', (data) => {
      console.log('+!+ ', data)
      rooms.setMinedItem(data);
    });
  });
});

exports.getServer = function () {
  return server;
};
