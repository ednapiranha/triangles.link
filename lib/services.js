'use strict';

var conf = require('./conf');
var Boom = require('boom');

var authenticate = require('./authenticate');

var ctx = {
  analytics: conf.get('analytics'),
  uid: false
};

var setContext = function (request) {
  ctx.session = request.auth.isAuthenticated || false;
  ctx.error = request.query.err || '';
  ctx.message = request.query.message || '';

  if (ctx.session) {
    ctx.uid = request.auth.credentials.uid;
  }
};

exports.home = function (request, reply) {
  if (request.auth.credentials && request.auth.credentials.uid) {
    return reply.redirect('/dashboard');
  }

  setContext(request);

  reply.view('index', ctx);
};

exports.join = function (request, reply) {
  ctx.error = request.query.err || '';
  ctx.email = request.query.email || '';
  reply.view('join', ctx);
};

exports.dashboard = function (request, reply) {
  setContext(request);

  reply.view('dashboard', ctx);
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

  reply.view('profile', ctx);
};

exports.user = function (request, reply) {
  setContext(request);

  authenticate.get(request.params.uid, function (err, profile) {
    if (err || !profile) {
      return reply(Boom.wrap(new Error('User not found'), 404));
    }

    ctx.user = profile;

    reply.view('user', ctx);
  });
};
