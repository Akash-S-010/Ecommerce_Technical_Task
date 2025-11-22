import express from 'express';
import checkAuth from '../middlewares/checkAuth.js';
import { createRazorpayOrder, handleRazorpayWebhook, getRazorpayKey } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', checkAuth, createRazorpayOrder);
router.post('/webhook', handleRazorpayWebhook);
router.get('/key', checkAuth, getRazorpayKey);

export default router;