import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    label: { type: String }, // Home, Work, etc.
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, default: "IN" },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String },
    googleId: { type: String, index: true },
    mobile: { type: String, index: true },
    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiresAt: { type: Date },
    addresses: [addressSchema],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
