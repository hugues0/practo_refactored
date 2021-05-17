const Joi = require('joi');

module.exports = function validateUser(user){
     const schema = {
        username: Joi.string().required().email(),
        password: Joi.string().required().min(5),
    };
    return Joi.validate(user, schema);
    
    }