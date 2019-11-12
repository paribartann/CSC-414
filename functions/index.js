const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const cors = require('cors')({ origin: true });
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
}));

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        const mailOptions = {
            from: 'SWIPE SHARE <paribartandhakal@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: req.body.donoremail,
            subject: 'Meal requested', // email subject
            text: 'Hello' + req.body.donoremail+', Thank you for donating meals on swipe share. Here are the details of registered recipient'+'name :'+req.body.name + 
            Number('email :')+ req.body.email+ 'mobile :' + req.body.mobile + 'Please communicate with the requestor to give the free meal. Thank you.'
        };

        //transporter.sendMail(mailOptions);
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }
            else {
                return res.send('Sended');
            }
        });
    });
});

exports.sendMail_recipient = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        const mailOptions = {
            from: 'SWIPE SHARE <paribartandhakal@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: req.body.email,
            subject: 'Your requested meal is here', // email subject
            text: 'Hello' +req.body.name+', Your requested meal from meal swipe is here. Here are the details of donor'+'name :'+req.body.donorname + 
            Number('email :')+ req.body.donoremail+ 'mobile :' + req.body.donormobile + 'Please communicate with donor to get the free meal. Thank you.'
        };

        //transporter.sendMail(mailOptions);
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }
            else {
                return res.send('Sended');
            }
        });
    });
});