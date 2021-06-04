const Joi = require('joi');
//const { noExtendLeft } = require('sequelize/types/lib/operators');
const response = require('../helpers/response');

module.exports = function validateStudent(req,res,next){
     const schema = {
        name: Joi.string().min(3).required(),
    };
    //return Joi.validate(student, schema);

    const {error} = Joi.validate(req.body,schema);
    if (error) return response.errorResponse(res,`${error.details[0].message}`,422);
    next();
    
    };