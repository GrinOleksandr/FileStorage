const mongoose = require('mongoose');

const fileStorageSchema = new mongoose.Schema({
    name : String,
    fileId:String,
    mimetype : String,
    link: String,
    uploadDate: String,
    owner: String,
    access: String,
    parent: String,
    folder: Boolean
});

let fileStorageDB = mongoose.model('FileStorage1', fileStorageSchema );
module.exports = fileStorageDB ;