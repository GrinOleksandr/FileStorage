'use strict';
const DB = require('./DB/db.js'),
    UsersDB = require('./DB/usersDB'),
    config = require('./config'),
    express = require('express'),
    app =express(),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload'),
    moment = require('moment'),
    typeIs = require('type-is'),
    tmp = require('tmp'),
    util = require('util'),
    fileRouter = require('./router/fileRouter.js'),
    userRouter = require('./router/userRouter.js'),
    http = require('http'),
    url = require('url'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    path = require('path'),
    passport = require('passport'),
    expressSession = require('express-session'),
    cookieParser = require('cookie-parser'),
    auth = require('./router/auth.js')(passport),
    session = require('express-session');

require('./passport')(passport);
mongoose.Promise = global.Promise;

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());


let expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(session({
    secret: 'husgFt46r5ftg.',
    saveUninitialized: false,
    resave: false,
    cookie: {
        expires: expiryDate
    }
}));

app.use(passport.initialize());
app.use(passport.session());

let loggedin = function (req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
};

app.use("/file", fileRouter);

/* GET home page. */
app.get('/',loggedin, function (req, res, next) {
    res.sendFile(path.join(__dirname+'./../public/home.html'));
});

app.get('/login', function (req, res, next) {
    res.sendFile(path.join(__dirname+'./../public/login.html'));
});

app.get('/home',loggedin , function (req, res, next) {
    res.sendFile(path.join(__dirname+'./../public/home.html'));
});

app.get('/signup', function (req, res, next) {
    res.sendFile(path.join(__dirname+'./../public/signup.html'));
});

app.use('/auth', auth);

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/')
});

app.get('/shared', function (req, res, next) {
    res.sendFile(path.join(__dirname+'./../public/shared.html'));
});































// Serve static files


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname+'../public'));
// });

///////// Routes setup Setup
// app.get("/testtest", function(req,res){
//     res.end('dfdfsfdsfdsfsd');
// });
// app.use(bodyParser.json());


//////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////
app.listen(config.port,config.ip);
console.log(`*****${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
console.log(`*****Server running at ${config.ip}:${config.port}`);















////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  INSPECTOR RUN COMMAND
//C:\Users\SCV\Dev\FileStorage\node_modules\.bin\nodemon --inspect -w C:\Users\SCV\Dev\FileStorage\server\  C:\Users\SCV\Dev\FileStorage\server\app.js --inspect
///////////////////////////////////////////////////////////////////////////////////////////////////////////

