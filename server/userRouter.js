const FileStorageDb = require('./db'),
    config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload'),
    moment = require('moment'),
    url = require('url'),
    fs = require('fs');
    formidableMiddleware = require('express-formidable');

const userRouter = express.Router();
userRouter.use(formidableMiddleware());
/////////////////////////////////////FILE Downloads///////////////////////////////////////////////
userRouter.use('/register', function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'text/plain');
    console.log(req.fields); // contains non-file fields
    console.log(req.files); // contains files

    let name = req.fields.name;
    let email = req.fields.email;
    // res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    // res.setHeader('Access-Control-Allow-Origin', '*');

    res.writeHead(200);
    console.log('Registering user');
    // fs.readFile(`${config.fileStoragePath}${parsedUrl.query.name}`, function (err, data) {
    //     if (err) {
    //         return res.status(500).send(err);
    //     }

        res.end(data);
        console.log('')
    // });
});

function registerUser(target) {
    let name = target.name || "unnamed",
        mimetype = target.mimetype || "",
        link = target.link || `${config.ip}:${config.port}/${target.name}`,
        date = moment().format('MMMM Do YYYY, h:mm:ss a'),
        owner = target.owner || "SashaGrin",
        access = target.access || owner,
        isFolder = target.folder || false,
        parent = target.parent || "/";

    FileStorageDb.create(
        {
            name: name,
            mimetype: mimetype,
            link: link,
            uploadDate: date,
            owner: owner,
            access: access,
            parent: parent,
            folder: isFolder,

        }, function (err) {
            if (err) return console.log(err);
        })
}

function sendRegistrationEmail(login,email,password){
    let API_KEY = ;
    let DOMAIN = ;
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
        to: email,
        subject: `Filex new user Registered`,
        text: `---------------------------
        User email is ${email}
        User login is ${login} 
        User password is ${password}   
        -------------------------------------  `
     };
        mailgun.messages().send(data, (error, body) => {
        console.log(body);
    });
}








module.exports = userRouter;
