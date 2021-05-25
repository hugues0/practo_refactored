const express = require('express');
const userscontroller = require ('../controllers/userscontroller')
const validateUser = require('../middlewares/usersvalidation');
const validateLogin = require('../middlewares/loginValidation');
const { addUser, loginUser } = userscontroller;

const router = express.Router();

router.post('/auth/signup',validateUser,addUser );
router.post('/auth/signin',validateLogin,loginUser);

module.exports = router;
