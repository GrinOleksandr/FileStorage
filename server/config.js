'use strict';

const host = 'localhost',
      dbName = 'test1';

module.exports = {
    port:8000,
    ip: '127.0.0.1',
    mongoUrl: `mongodb://${host}/${dbName}`
};