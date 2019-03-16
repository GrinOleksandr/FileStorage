const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 5005;
const formidableMiddleware = require('express-formidable');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// CONTACT FORM HANDLER!!

app.use(formidableMiddleware());
app.post('/sendmail', function (req, res){
        console.log(req.fields); // contains non-file fields
        console.log(req.files); // contains files

    let name = req.fields.name;
    let email = req.fields.email;
    let copyEmail = '1nutak1@gmail.com';
    let message = req.fields.message;

    let API_KEY = 'key-e43efabe92097d2f6509022233c3d323';
    let DOMAIN = 'scv.pp.ua';
    let mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

    const data = {
        from: 'Grin Oleksandr <grin.scv@gmail.com>',
        to: email,
        cc: copyEmail,
        subject: `Grin Oleksandr's website`,
        text: `Hello ${name} (from ${email}) you have submitted a message on my website.
        The message was:
        ----------------------------------------------------------------
        ${message}
        ----------------------------------------------------------------
        I'll read it ASAP.       
        Good Bye!`
    };

    mailgun.messages().send(data, (error, body) => {
        console.log(body);

    });
    res.end();


});
// END OF HANDLER

http.listen(port, function () {
    console.log(`***Server running at localhost:${port}`);
});