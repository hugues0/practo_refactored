import express from 'express';
import userscontroller from '../controllers/userscontroller';
import validateUser from '../middlewares/usersvalidation';
import validateLogin from '../middlewares/loginValidation';
const { addUser, loginUser } = userscontroller;

const router = express.Router();

router.post('/auth/signup',validateUser,addUser );
router.post('/auth/signin',validateLogin,loginUser);

export default router;
