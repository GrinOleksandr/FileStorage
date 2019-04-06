'use strict';

const host = 'localhost',
      dbName = 'test5';

module.exports = {
    ip:"localhost",
    port: process.env.PORT || 8000,
    mongoUrl: `mongodb+srv://filex:Filex123@testclusterscv-rokh7.mongodb.net/test`,
    fileStoragePath: `./server/filestorage/`
};

// fileStoragePath: `${__dirname}/filestorage/`