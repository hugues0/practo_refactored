import bcrypt from 'bcrypt';


const encryptPassword=(password) =>{
const saltRounds = 10;
return bcrypt.hash(password,saltRounds);
};

export default encryptPassword;