import bcrypt from 'bcrypt';

const passwordDecryptor = (password,hashedPassword) =>{
    return bcrypt.compare(password,hashedPassword);

};

export default passwordDecryptor;