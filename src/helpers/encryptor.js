const bcrypt = require('bcrypt');


const encryptPassword=(password) =>{
const saltRounds = 10;
return bcrypt.hash(password,saltRounds);
};

module.exports = encryptPassword;