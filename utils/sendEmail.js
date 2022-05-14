const nodemailer = require('nodemailer');

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        port:25,
        auth: {
            user: process.env.EMAIL_FORM,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
          }
    })

    const mailOptions = {
        from: process.env.EMAIL_FORM,
        to: options.to,
        subject: options.subject,
        html: options.text
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if(err) {
            console.log(err)
        }else {
            console.log(info)
        }
    });
};


module.exports = sendEmail;