import Order from '../models/Order.js';
import { Product } from '../models/Product.js';
import User from '../models/User.js';
import { createRazorpayOrder } from './paymentController.js';

// -----Place a new order
export const placeOrder = async (req, res) => {
  try {
    const { userId } = req.user;
    const { items, address, paymentType } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    if (!address || !address.label || !address.street || !address.city || !address.state || !address.pincode) {
      return res.status(400).json({ message: 'Complete address is required' });
    }

    if (!['COD', 'Razorpay'].includes(paymentType)) {
      return res.status(400).json({ message: 'Invalid payment type' });
    }

    const productIds = items.map((item) => item.productId);

    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== productIds.length) {
      return res.status(400).json({ message: 'One or more products are invalid' });
    }

    let totalPrice = 0;
    const orderItems = items.map((item) => {
      const product = products.find((p) => p._id.toString() === item.productId);
      const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;

      totalPrice += product.price * quantity;

      return {
        product: product._id,
        quantity,
      };
    });

    const order = new Order({
      user: userId,
      items: orderItems,
      totalPrice,
      address,
      paymentType,
      paymentStatus: 'pending',
    });

    if (paymentType === 'Razorpay') {
      // Call Razorpay order creation
      const razorpayOrder = await createRazorpayOrder({ body: { amount: totalPrice, currency: 'INR', receipt: order._id.toString() } }, res);
      if (razorpayOrder && razorpayOrder.orderId) {
        order.razorpayOrderId = razorpayOrder.orderId;
      } else {
        return res.status(500).json({ message: 'Failed to create Razorpay order' });
      }
    }

    await order.save();

    await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

    res.status(201).json({
      message: 'Order placed successfully',
      order,
      razorpayOrderId: order.razorpayOrderId,
    });
  } catch (error) {
    console.error('Place order error:', error);
    return res.status(500).json({ message: 'Server error while placing order' });
  }
};


// -----Get all orders for logged-in user
export const getMyOrders = async (req, res) => {
  try {
    const { userId } = req.user;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('items.product');

    res.status(200).json(orders);
  } catch (error) {
    console.error('Get my orders error:', error);
    return res.status(500).json({ message: 'Server error while fetching orders' });
  }
};


// -----Get single order details for logged-in user
export const getOrderById = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const order = await Order.findOne({ _id: id, user: userId }).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Get order by id error:', error);
    return res.status(500).json({ message: 'Server error while fetching order' });
  }
};


// -----Update payment status (demo payment gateway)
export const updatePaymentStatus = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const { paymentStatus } = req.body;

    if (!['pending', 'paid', 'failed'].includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }

    const order = await Order.findOne({ _id: id, user: userId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.paymentStatus = paymentStatus;

    if (paymentStatus === 'paid' && order.orderStatus === 'Pending') {
      order.orderStatus = 'Preparing';
    }

    await order.save();

    res.status(200).json({
      message: 'Payment status updated successfully',
      order,
    });
  } catch (error) {
    console.error('Update payment status error:', error);
    return res.status(500).json({ message: 'Server error while updating payment status' });
  }
};
