const Joi = require('joi');
const response = require('../helpers/response');

module.exports = function validateUser(req,res,next){
     const schema = {
        username: Joi.string().required().email(),
        password: Joi.string().required().min(5),
    };
    //return Joi.validate(user, schema);
    
    const {error} = Joi.validate(req.body,schema);
    if (error) return response.errorResponse(res,`${error.details[0].message}`,422);
    next();

    };