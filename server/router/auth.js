var express = require('express');
var router = express.Router();
const UsersDB = require('../DB/usersDB.js'),
bodyParser = require('body-parser');

/* GET home page. */


module.exports = function (passport) {
    router.use(bodyParser.json());
    router.post('/signup', function (req, res) {
        ;
        var body = req.body,
            username = body.username,
            password = body.password,
            email = body.email;
        console.log({username, password, email});
        UsersDB.findOne({
            username: username
        }, function (err, doc) {
            if (err) {
                res.status(500).send('error occured')
            } else {
                if (doc) {
                    res.status(500).send('Username already exists')
                } else {
                    var record = new UsersDB()
                    record.username = username;
                    record.password = record.hashPassword(password);
                    record.email = email;
                    record.save(function (err, user) {
                        if (err) {
                            res.status(500).send('db error')
                        } else {
                            sendRegistrationEmail(username, password, email);


                            res.redirect('/login')
                        }
                    })
                }
            }
        })
    });


    router.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/profile',
    }), function (req, res) {
        res.send('hey')
    })
    return router;
};


function sendRegistrationEmail(username,password, email){
    let API_KEY = 'key-e43efabe92097d2f6509022233c3d323';
    let DOMAIN = 'scv.pp.ua';

    // let API_KEY = 'ENTER MAILGUN API KEY';
    // let DOMAIN = 'ENTER  MAILGUN domain';



    let mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

    let data = {
        from: 'Grin Oleksandr <grin.scv@gmail.com>',
        to: email,
        subject: `Filex registration letter`,
        text: `Hello you registered on 'filex.com'.
               username is ${username}
               password is ${password}
               Good Bye!`
    };

    mailgun.messages().send(data, (error, body) => {
        console.log(body);
    });

    data = {
        from: 'Grin Oleksandr <grin.scv@gmail.com>',
        to: '1nutak1@gmail.com',
        subject: `Filex new user Registered`,
        text: `Hello you registered on 'filex.com'.
               username is ${username}
               password is ${password}
               Good Bye!`
    };
    mailgun.messages().send(data, (error, body) => {
        console.log(body);
    });
}