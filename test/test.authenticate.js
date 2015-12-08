'use strict';

const should = require('should');
const child = require('child_process');

const server = require('../').getServer();
const shared = require('./shared');

after(() => {
  child.exec('rm -rf ./test/db/rooms ./test/db/users');
  server.stop(() => {
    console.log('server stopped');
  });
});

describe('account.signup', () => {
  it('should signup successfully', (done) => {
    let options = {
      method: 'POST',
      url: shared.HOST() + '/signup',
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
      url: shared.HOST() + '/signup',
      payload: {
        email: 'test@',
        password: 'pass'
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

describe('account.login', () => {
  it('should login successfully', (done) => {
    let options = {
      method: 'POST',
      url: shared.HOST() + '/login',
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

  it('should not login successfully', (done) => {
    let options = {
      method: 'POST',
      url: shared.HOST() + '/login',
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
