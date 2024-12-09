const transporter = require('./email.config.js');

const sendVerificationCode = async (email, verificationCode) => {
    try{
        const response = await transporter.sendMail({
            from: '"Suvesh Pandey" <jpusvesh29@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Verify your email ✔", // Subject line
            text: "Verify your email.", // plain text body
            html: verificationCode, // html body
        });
        console.log("Email sent successfully.", response);
    }
    catch(error){
        console.log("Email error:  ", error.message);
    }
}

module.exports = sendVerificationCode;