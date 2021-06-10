import Joi from 'joi';
import response from '../helpers/response';

function validateLogin(req,res,next){
     const schema = {
        username: Joi.string().required().email(),
        password: Joi.string().required().min(5),
    };
    //return Joi.validate(user, schema);
    
    const {error} = Joi.validate(req.body,schema);
    if (error) return response.response(res,422,'error',`${error.details[0].message}`,true);
    next();

    };
export default validateLogin;