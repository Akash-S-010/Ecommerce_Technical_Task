import express from 'express';
import { createProduct, getAllProducts, getProductById, addProductReview } from '../controllers/productController.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/:id', getProductById);
router.get('/', getAllProducts);
router.post('/:id/reviews', checkAuth, addProductReview);

export default router;