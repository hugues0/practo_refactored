const jwt = require('jsonwebtoken');

 const generateToken = (payload) =>{
    const token = jwt.sign
    ({payload,},process.env.JWT,{expiresIn:'1d'});
    return token;
}

module.exports = generateToken;