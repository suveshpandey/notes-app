const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "jpsuvesh29@gmail.com",
        pass: "tcjp bnfq jdsv hfuw",
    },
});
module.exports = transporter