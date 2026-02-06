import express from 'express';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../controllers/employees.controller.js';
import validateEmployee from '../middlewares/middleware_validate.js';

const router = express.Router();

router.get('/', getEmployees);
router.post('/', validateEmployee, addEmployee);
router.patch('/:id',validateEmployee, updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;

