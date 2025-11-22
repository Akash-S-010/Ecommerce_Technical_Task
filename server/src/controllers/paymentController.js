import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';
import Order from '../models/Order.js';
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ------Create a new Razorpay order instance (Helper)
export const createRazorpayOrderInstance = async (amount, currency, receipt) => {
  const options = {
    amount: amount * 100, // amount in smallest currency unit (e.g., paise for INR)
    currency,
    receipt,
  };
  return await razorpay.orders.create(options);
};

// ------Create a new Razorpay order (Controller)
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;
    const order = await createRazorpayOrderInstance(amount, currency, receipt);

    res.status(201).json({
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({ message: 'Server error while creating Razorpay order' });
  }
};

//--------Handle Razorpay webhook notifications
export const handleRazorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  if (digest === req.headers['x-razorpay-signature']) {
    console.log('Webhook signature verified successfully');
    // Process the webhook event
    const event = req.body.event;
    const payment = req.body.payload.payment.entity;

    switch (event) {
      case 'payment.captured':
        console.log('Payment captured:', payment);
        try {
          const order = await Order.findOneAndUpdate(
            { razorpayOrderId: payment.order_id },
            { paymentStatus: 'paid' },
            { new: true }
          );
          if (order) {
            console.log('Order payment status updated to paid:', order._id);
          } else {
            console.log('Order not found for Razorpay order ID:', payment.order_id);
          }
        } catch (err) {
          console.error('Error updating order status to paid:', err);
        }
        break;
      case 'payment.failed':
        console.log('Payment failed:', payment);
        try {
          const order = await Order.findOneAndUpdate(
            { razorpayOrderId: payment.order_id },
            { paymentStatus: 'failed' },
            { new: true }
          );
          if (order) {
            console.log('Order payment status updated to failed:', order._id);
          } else {
            console.log('Order not found for Razorpay order ID:', payment.order_id);
          }
        } catch (err) {
          console.error('Error updating order status to failed:', err);
        }
        break;
      default:
        console.log('Unhandled Razorpay event:', event);
    }
    res.status(200).json({ status: 'ok' });
  } else {
    res.status(403).json({ message: 'Invalid signature' });
  }
};

export const getRazorpayKey = async (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
};