const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '9007718844fe19',
    pass: 'e6647eebbdd001',
  },
});

module.exports = transport;
