import express from 'express';
import checkAuth from '../middlewares/checkAuth.js';
import { placeOrder, getMyOrders, getOrderById, updatePaymentStatus } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', checkAuth, placeOrder);
router.get('/my', checkAuth, getMyOrders);
router.get('/:id', checkAuth, getOrderById);
router.patch('/:id/payment', checkAuth, updatePaymentStatus);

export default router;
