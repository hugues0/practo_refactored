const express = require('express');
const userscontroller = require ('../controllers/userscontroller')
const validateUser = require('../middlewares/usersvalidation');
const { addUser, loginUser } = userscontroller;

const router = express.Router();

router.post('/auth/signup',validateUser,addUser );
router.post('/auth/signin',loginUser);

module.exports = router;
