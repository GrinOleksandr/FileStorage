const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UsersSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password: {
        type: String,
        required: true,
    },
    email: String
});

UsersSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
};

UsersSchema.methods.comparePassword = function (password,hash) {
    return bcrypt.compareSync(password,hash)
};


let UsersDB = mongoose.model('UsersDB1', UsersSchema );
module.exports = UsersDB ;





