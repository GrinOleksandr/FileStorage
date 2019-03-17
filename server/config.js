'use strict';

const host = 'localhost',
      dbName = 'test4';

module.exports = {
    ip:"localhost",
    port:8000,
    mongoUrl: `mongodb://${host}/${dbName}`,
    fileStoragePath: `${__dirname}/filestorage/`
};