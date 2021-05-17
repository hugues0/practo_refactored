const express = require('express');
const userscontroller = require ('../controllers/userscontroller')

const { addUser, loginUser } = userscontroller;

const router = express.Router();

router.post('/auth/signup',addUser );
router.post('/auth/signin',loginUser);

module.exports = router;
