'use strict';

const host = 'localhost',
      dbName = 'test4';

module.exports = {
    port: process.env.PORT || 8000,
    ip: 'localhost',
    mongoUrl: `mongodb://${host}/${dbName}`,
    fileStoragePath: `${__dirname}/fileStorage/`
};