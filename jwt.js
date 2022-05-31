const jwt = require("jsonwebtoken");

function signToken(email, timeExpiration){
    return jwt.sign(
        { 
          email: email
        },
        process.env.SECRET,
        { expiresIn: timeExpiration }
      );
}

exports.signToken = signToken;