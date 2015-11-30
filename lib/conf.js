'use strict';

const nconf = require('nconf');

nconf.argv().env().file({ file: 'local.json' });

nconf.defaults({
  port: 3000,
  cookie: 'secret'
});

module.exports = nconf;
