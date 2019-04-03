const mongoose = require('mongoose');

const fileStorageSchema = new mongoose.Schema({
    name : String,
    size: String,
    fileId:String,
    mimetype : String,
    link: String,
    uploadDate: String,
    owner: String,
    access: String,
    parent: String,
    isShared: Boolean,
    isFolder: Boolean
});

let fileStorageDB = mongoose.model('FileStorage12333l4223', fileStorageSchema );
module.exports = fileStorageDB ;