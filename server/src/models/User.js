import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  label: { type: String, required: true }, // e.g., "Home", "Office"
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, default: 'India' },
}, { _id: true });

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String }, // hashed, optional for google accounts
  mobile: { type: String },
  // emailVerification
  otp: { type: String },
  otpExpiresAt: { type: Date },
  isVerified: { type: Boolean, default: false },
  googleId: { type: String }, // store Google sub id if created via Google
  addresses: [addressSchema],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
