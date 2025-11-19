import express from 'express';
import checkAuth from '../middlewares/checkAuth.js';
import { getCart, addToCart, updateCartItemQuantity, removeFromCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', checkAuth, getCart);
router.post('/add', checkAuth, addToCart);
router.put('/item/:productId', checkAuth, updateCartItemQuantity);
router.delete('/item/:productId', checkAuth, removeFromCart);

export default router;
