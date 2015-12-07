'use strict';

const Boom = require('boom');
const Bcrypt = require('bcrypt');
const postmark = require('postmark');
const uuid = require('uuid');

const conf = require('./conf');
const db = require('./db').register('users');
const rooms = require('./rooms');

let updateProfile = function (user, next) {
  let ops = [
    {
      type: 'put',
      key: 'email!' + user.email,
      value: user
    },
    {
      type: 'put',
      key: 'uid!' + user.uid,
      value: user
    }
  ];

  db.batch(ops, (err) => {
    if (err) {
      return next(err);
    }

    next(null, user.password);
  });
};

let updatePassword = function (user, password, next) {
  Bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    Bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      user.resetUID = uuid.v4();
      updateProfile(user, next);
    });
  });
};
/*
exports.get = function (uid, next) {
  db.get('uid!' + uid, (err, profile) => {
    if (err || !profile) {
      return next(new Error('No such user found.'));
    }

    next(null, profile);
  });
};
*/

exports.signup = function (request, reply) {
  let email = request.payload.email;
  let password = request.payload.password;

  let user = {
    name: email.split('@')[0],
    email: email,
    uid: uuid.v4()
  };

  let addUser = function (hash) {
    user.password = hash;

    updateProfile(user, (err) => {
      if (err) {
        return reply(Boom.wrap(err, 400));
      }

      rooms.generateMining(user.uid);
      request.auth.session.set(user);
      reply.redirect('/');
    });
  };

  // If user is found, throw an error, otherwise create a new account
  db.get('email!' + email, (err, profile) => {
    if (profile) {
      return reply(Boom.wrap(new Error('Account already exists'), 400));
    }

    updatePassword(user, password, (err, hash) => {
      if (err) {
        return reply(Boom.wrap(err, 400));
      }

      addUser(hash);
    });
  });
};

exports.update = function (request, reply) {
  let name = request.payload.name;
  let password = request.payload.password;
  db.get('email!' + request.auth.credentials.email, (err, profile) => {
    if (err || !profile) {
      return reply(Boom.wrap(new Error('User does not exist'), 400));
    }

    profile.name = name;
    request.auth.credentials.name = name;

    if (password) {
      if (password.length < 6) {
        return reply(Boom.wrap(new Error('Password must be at least 6 characters'), 400));
      }

      updatePassword(profile, password, (err, hash) => {
        if (err) {
          return reply(Boom.wrap(err, 400));
        }

        profile.password = hash;

        updateProfile(profile, (err) => {
          if (err) {
            return reply(Boom.wrap(err, 400));
          }

          reply.redirect('/settings?message=password+updated');
        });
      });
    } else {
      updateProfile(profile, (err) => {
        if (err) {
          return reply(Boom.wrap(err, 400));
        }

        reply.redirect('/settings?message=profile+updated');
      });
    }
  });
};

exports.forgotPassword = function (request, reply) {
  let email = request.payload.email;
  let client = new postmark.Client(conf.get('postmark-key'));

  let resetUID = uuid.v4();

  db.get('email!' + email, (err, user) => {
    if (!err && user) {
      user.resetUID = resetUID;

      updateProfile(user, (err) => {
        if (err) {
          console.log('Could not update user with reset password key');
          reply.redirect('/resetPassword');
        }

        client.sendEmail({
          From: conf.get('postmark-email'),
          To: email,
          Subject: 'Triangles - Password Reset',
          TextBody: 'Click on the link below to reset your password.\n\n' +
                    conf.get('externalDomain') + '/password/reset?uid=' +
                    resetUID + '&email=' + email
        }, (err) => {
          if (err) {
            console.error('Unable to send via postmark: ' + err.message);
            return;
          }
          console.log('sent email to : ', email, conf.get('externalDomain') +
                      '/password/reset?uid=' + resetUID + '&email=' + email);
          reply.redirect('/');
        });
      });
    } else {
      reply.redirect('/password/forgot?err=email+not+found');
    }
  });
};

exports.resetPassword = function (request, reply) {
  let password1 = request.payload.password1;
  let password2 = request.payload.password2;
  let email = request.payload.email;
  let resetUID = request.payload.resetUID;

  if (password1 !== password2) {
    return reply(Boom.wrap(new Error('Passwords do not match'), 400));
  }

  db.get('email!' + email, (err, user) => {
    if (err) {
      return reply(Boom.wrap(err, 400));
    }

    if (user.resetUID !== resetUID) {
      return reply(Boom.wrap(new Error('Invalid reset key'), 400));
    }

    updatePassword(user, password1, function (err) {
      if (err) {
        return reply(Boom.wrap(err, 400));
      }

      reply.redirect('/');
    });
  });
};

exports.login = function (request, reply) {
  let email = request.payload.email;
  let password = request.payload.password;

  db.get('email!' + email, (err, user) => {
    if (err) {
      return reply(Boom.wrap(new Error('Invalid username or password'), 400));
    }

    Bcrypt.compare(password, user.password, (err, isValid) => {
      if (err || !isValid) {
        return reply(Boom.wrap(new Error('Invalid username or password'), 400));
      }

      request.auth.session.set(user);
      //console.log('logging in ', user, request.auth.isAuthenticated);
      reply.redirect('/dashboard');
    });
  });
};

exports.logout = function (request, reply) {
  request.auth.session.clear();
  reply.redirect('/');
};
