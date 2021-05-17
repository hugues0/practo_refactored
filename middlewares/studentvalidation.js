const Joi = require('joi');

module.exports = function validateStudent(student){
     const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(student, schema);
    
    }