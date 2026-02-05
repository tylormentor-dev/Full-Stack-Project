import express from 'express';
import { getTimeOffRequests, addTimeOffRequest, updateTimeOffRequest, deleteTimeOffRequest } from '../controllers/timeOffController.js';

const router = express.Router();

router.get('/', getTimeOffRequests);
router.post('/', addTimeOffRequest);
router.patch('/:request_id', updateTimeOffRequest);
router.delete('/:request_id', deleteTimeOffRequest);

export default router;