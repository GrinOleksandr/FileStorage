const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    login : String,
    email : String,
    password : String
});

let UsersDB = mongoose.model('UsersDB1', UsersSchema );
module.exports = UsersDB ;
