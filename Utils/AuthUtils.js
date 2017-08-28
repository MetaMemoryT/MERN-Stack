const nodemailer = require("nodemailer");


var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'therealaladhims@gmail.com',
      pass: 'sabayota014'
    }
});

exports.sentMailVerificationLink = (user, token, callback) => {
    var textLink = "http://localhost:3001/user/verify?token="+token+"&id="+user._id;
    var from = `Alfian Developer`;
    var mailbody = `<p>Thanks for Registering</p><p>Please verify your email by clicking on the verification link below.<br/><a href=${textLink.toString()}
    >Verification Link</a></p>`
    console.log(user.email);
    mail(from, user.email , `Account Verification`, mailbody, function(error, success){
        callback(error, success)
    });
};

function mail(from, email, subject, mailbody, callback){
    var mailOptions = {
        from: from, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        //text: result.price, // plaintext body
        html: mailbody  // html body
    };

    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            callback(error, null)
        }
        else{
            callback(null, response)
        }
        smtpTransport.close(); // shut down the connection pool, no more messages
    });
}
