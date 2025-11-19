import express from 'express';
import { createRazorpayOrder, handleRazorpayWebhook } from '../controllers/paymentController.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

router.post('/razorpay/order', checkAuth, createRazorpayOrder);
router.post('/razorpay/webhook', handleRazorpayWebhook);



export default router;