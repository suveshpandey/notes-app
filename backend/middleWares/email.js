const transporter = require('./email.config.js');

const sendVerificationCode = async (email, verificationCode) => {
    try{
        const response = await transporter.sendMail({
            from: '"Suvesh Pandey" <jpusvesh29@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Verify your email ✔", // Subject line
            text: `Your verification code is: ${verificationCode}`, // plain text body
            html: `<h1>Verification Code</h1><p>Your verification code is: <strong>${verificationCode}</strong></p>`, // html body
        });
        console.log("Email sent successfully.", response);
    }
    catch(error){
        console.log("Email error:  ", error.message);
    }
}

module.exports = sendVerificationCode;