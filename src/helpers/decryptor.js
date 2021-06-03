const bcrypt = require('bcrypt');

const passwordDecryptor = (password,hashedPassword) =>{
    return bcrypt.compare(password,hashedPassword);

};

module.exports = passwordDecryptor;