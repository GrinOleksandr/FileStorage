const UsersDB = require('../DB/usersDB'),
    config = require('../config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload'),
    moment = require('moment'),
    url = require('url'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    formidableMiddleware = require('express-formidable'),
    passport = require('passport');

const userRouter = express.Router();















// userRouter.use(formidableMiddleware());
// /////////////////////////////////////FILE Downloads///////////////////////////////////////////////
// userRouter.use('/register', function (req, res) {
//     let parsedUrl = url.parse(req.url, true);
//     res.setHeader('Content-Type', 'text/plain');
//     console.log(req.fields); // contains non-file fields
//     console.log(req.files); // contains files
//
//     let login = req.fields.login;
//     let email = req.fields.email;
//     let password = req.fields.password;
//
//     res.writeHead(200);
//     console.log('Registering user');
//     registerUser(login, email, password);
//     // sendRegistrationEmail(login, email, password);
//
//
//     res.end();
// });
//
// function registerUser(login, email, password) {
//
//
//
// }
//
function sendRegistrationEmail(login,email,password){
    let API_KEY = 'ENTER MAILGUN API KEY';
    let DOMAIN = 'ENTER  MAILGUN domain';
    let mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

    let data = {
        from: 'Grin Oleksandr <grin.scv@gmail.com>',
        to: email,
        subject: `Filex registration letter`,
        text: `Hello you registered on 'filex.com'.
        Your login is ${login}
        Your password is ${password}
        Good Bye!`
    };

    mailgun.messages().send(data, (error, body) => {
        console.log(body);
    });

    data = {
        from: 'Grin Oleksandr <grin.scv@gmail.com>',
        to: '1nutak1@gmail.com',
        subject: `Filex new user Registered`,
        text:
        `User email is ${email}
        User login is ${login}
        User password is ${password}
        -------------------------------------  `
     };
        mailgun.messages().send(data, (error, body) => {
        console.log(body);
    });
}
//
// // UsersDB.create(
// //     {
// //         login:login,
// //         email:email,
// //         password:password
// //     }, function (err) {
// //         if (err) return console.log(err);
// //     });




module.exports = userRouter;
