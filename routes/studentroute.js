
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const studentsController = require('../controllers/students');

const { getAll, postIn, getById,updateById, deleteById } = studentsController;

//const router = Router();

router.post('/students',auth, postIn);
router.put('/students/:id',auth,updateById);
router.delete('/students/:id',auth,deleteById);
router.get('/students',auth,getAll);
router.get('/students/:id',auth,getById);

module.exports = router;
