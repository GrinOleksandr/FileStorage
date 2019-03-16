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

const fileStorage = new mongoose.Schema({
    name : String,
    mimetype : String,
    link: String,
    uploadDate: String,
    owner: String,
    access: String,
    parent: String,
    folder: Boolean
});

module.exports = mongoose.model('TestFilesDb1', fileStorage );