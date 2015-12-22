'use strict';

const conf = require('./conf');
const Boom = require('boom');

const authenticate = require('./authenticate');
const rooms = require('./rooms');

let ctx = {
  analytics: conf.get('analytics'),
  uid: false
};

let setContext = function (request) {
  ctx.session = request.auth.isAuthenticated || false;
  ctx.error = request.query.err || '';
  ctx.message = request.query.message || '';

  if (ctx.session) {
    ctx.uid = request.auth.credentials.uid;
    ctx.name = request.auth.credentials.name;
  }
};

exports.home = function (request, reply) {
  if (request.auth.credentials && request.auth.credentials.uid) {
    return reply.redirect('/t/' + request.auth.credentials.uid);
  }

  setContext(request);

  reply.view('index', ctx);
};

exports.worlds = function (request, reply) {
  setContext(request);

  rooms.getAllRooms((err, worlds) => {
    if (err) {
      return reply(Boom.wrap(err, 400));
    }

    ctx.worlds = worlds;

    reply.view('worlds', ctx);
  });
};

exports.about = function (request, reply) {
  setContext(request);

  reply.view('about', ctx);
};

exports.join = function (request, reply) {
  ctx.error = request.query.err || '';
  ctx.email = request.query.email || '';
  reply.view('join', ctx);
};

exports.dashboard = function (request, reply) {
  setContext(request);

  return reply.redirect('/t/' + request.auth.credentials.uid);
};

exports.forgotPassword = function (request, reply) {
  ctx.error = request.query.err || '';
  ctx.session = request.auth.isAuthenticated || false;
  reply.view('forgot_password', ctx);
};

exports.resetPassword = function (request, reply) {
  ctx.error = request.query.err || '';
  ctx.session = request.auth.isAuthenticated || false;
  ctx.email = request.query.email;
  ctx.resetUID = request.query.uid;
  reply.view('reset_password', ctx);
};

exports.profile = function (request, reply) {
  setContext(request);

  ctx.name = request.auth.credentials.name;
  ctx.email = request.auth.credentials.email;
  ctx.world = request.auth.credentials.world;

  reply.view('profile', ctx);
};

exports.room = function (request, reply) {
  setContext(request);

  if (ctx.uid && ctx.uid === request.params.uid) {
    ctx.owner = true;
  } else {
    ctx.owner = false;
  }

  rooms.get(request.params.uid, (err, roomData) => {
    if (err) {
      return reply(Boom.wrap(err, 404));
    }

    ctx.room = roomData.id;
    ctx.world = roomData.world || false;
    reply.view('dashboard', ctx);
  });
};

exports.user = function (request, reply) {
  setContext(request);

  authenticate.get(request.params.uid, (err, profile) => {
    if (err || !profile) {
      return reply(Boom.wrap(new Error('User not found'), 404));
    }

    ctx.user = profile;

    reply.view('user', ctx);
  });
};
