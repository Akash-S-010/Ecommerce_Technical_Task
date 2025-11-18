import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderAddressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

const paymentSchema = new mongoose.Schema(
  {
    method: { type: String, enum: ["razorpay", "cod"], required: true },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    status: { type: String, enum: ["pending", "paid", "failed", "refunded"], default: "pending" },
    paidAt: { type: Date },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    orderNumber: { type: String, required: true, unique: true },
    items: [orderItemSchema],
    shippingAddress: orderAddressSchema,
    payment: paymentSchema,
    totalAmount: { type: Number, required: true, min: 0 },
    deliveryCharges: { type: Number, default: 0, min: 0 },
    finalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "out_for_delivery", "delivered", "cancelled"],
      default: "pending",
    },
    estimatedDelivery: { type: Date },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

orderSchema.pre("save", function (next) {
  if (!this.orderNumber) {
    this.orderNumber = "ORD" + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});

export default mongoose.model("Order", orderSchema);
