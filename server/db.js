//DB setup
'use strict';
const mongoose = require('mongoose'),
      config = require('./config');

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUrl, {
    useMongoClient:true
})
    .then( () => console.log("*****DB connected successful"))
    .catch(e => console.log(e));
