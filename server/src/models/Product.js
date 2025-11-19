import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    rating: {
      type: Number, required: true,
      min: 1,
      max: 5
    },

    title: {
      type:
        String
    },

    comment: {
      type: String,
      required: true

    },
  },
  { timestamps: true }
);


const productSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [String],
  category: String,
  brand: String,
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  reviews: [reviewSchema],
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
