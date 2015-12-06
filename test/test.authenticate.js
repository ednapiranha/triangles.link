'use strict';

const should = require('should');
const conf = require('nconf');
const io = require('socket.io-client');
const child = require('child_process');
const request = require('request');

const server = require('../').getServer();

conf.argv().env().file({ file: 'test/local.json' });

const HOST = 'http://127.0.0.1:' + conf.get('port');

let wsOpts = {
  transports: ['websocket'],
  'force new connection': true,
  'reconnection delay': 0,
  'reopen delay': 0
};

after(function() {
  child.exec('rm -rf ./test/db/rooms ./test/db/users');
  server.stop(() => {
    console.log('server stopped');
  });
});

describe('account.signup', function () {
  it('should signup successfully', (done) => {
    let options = {
      method: 'POST',
      url: HOST + '/signup',
      payload: {
        email: 'test@triangles.link',
        password: 'password'
      }
    };

    server.inject(options, (res) => {
      let header = res.headers['set-cookie'];
      header.length.should.equal(1);
      res.statusCode.should.equal(302);
      done();
    });
  });

  it('should signup unsuccessfully', (done) => {
    let options = {
      method: 'POST',
      url: HOST + '/signup',
      payload: {
        email: 'test@',
        password: 'pass'
      }
    };

    server.inject(options, function (res) {
      let header = res.headers['set-cookie'];
      should.not.exist(header);
      res.headers.location.should.match(/\?err=/);
      res.statusCode.should.equal(302);
      done();
    });
  });
});

describe('account.login', function () {
  it('should login successfully', (done) => {
    let options = {
      method: 'POST',
      url: HOST + '/login',
      payload: {
        email: 'test@triangles.link',
        password: 'password'
      }
    };

    server.inject(options, function (res) {
      let header = res.headers['set-cookie'];
      header.length.should.equal(1);
      res.statusCode.should.equal(302);
      done();
    });
  });

  it('should not login successfully', (done) => {
    let options = {
      method: 'POST',
      url: HOST + '/login',
      payload: {
        password: 'wrong'
      }
    };

    server.inject(options, (res) => {
      let header = res.headers['set-cookie'];
      should.not.exist(header);
      res.headers.location.should.match(/\?err=/);
      res.statusCode.should.equal(302);
      done();
    });
  });
});

/*
  it('should not update a profile', function (done) {
    let account = {
      name: 'test2',
      bio: '?',
      publicURL: ''
    };

    let data = {
      type: 'account.update',
      account: account
    };

    let socket = io.connect(HOST, wsOpts);

    socket.on('connect', function () {
      socket.emit('account', data);

      socket.on('accountack', function (d) {
        d.type.should.equal('account.error');
        d.error.should.equal('publicURL cannot be empty');
        socket.disconnect();
        done();
      });
    });
  });
*/

