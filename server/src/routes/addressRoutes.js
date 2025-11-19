import express from 'express';
import { addAddress, getAddresses, updateAddress, deleteAddress } from '../controllers/addressController.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

router.post('/add', checkAuth, addAddress);
router.get('/list', checkAuth, getAddresses);
router.put('/:addressId', checkAuth, updateAddress);
router.delete('/:addressId', checkAuth, deleteAddress);

export default router;