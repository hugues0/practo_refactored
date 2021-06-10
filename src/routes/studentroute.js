
import express from'express';
import auth from '../middlewares/auth';
import studentsController from '../controllers/students';
import validateStudent from '../middlewares/studentvalidation';
const router = express.Router();
const { getAll, postIn, getById,updateById, deleteById } = studentsController;


router.post('/students',auth,validateStudent,postIn);
router.put('/students/:id',auth,validateStudent,updateById);
router.delete('/students/:id',auth,deleteById);
router.get('/students',auth,getAll);
router.get('/students/:id',auth,getById);

export default router;
