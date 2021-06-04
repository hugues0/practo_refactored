
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const studentsController = require('../controllers/students');
const validateStudent = require('../middlewares/studentvalidation');
const { getAll, postIn, getById,updateById, deleteById } = studentsController;


router.post('/students',auth,validateStudent,postIn);
router.put('/students/:id',auth,validateStudent,updateById);
router.delete('/students/:id',auth,deleteById);
router.get('/students',auth,getAll);
router.get('/students/:id',auth,getById);

module.exports = router;
