import React from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartStore";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();
  const { _id, Title, price, images, rating, numReviews, brand } = product;

  // Calculate discount percentage (dummy for now)
  const originalPrice = Math.round(price * 1.3);
  const discountPercent = Math.round(
    ((originalPrice - price) / originalPrice) * 100
  );

  // Format price
  const formatPrice = (num) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-[#FFA41C]">
          ★
        </span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-[#FFA41C]">
          ★
        </span>
      );
    }
    while (stars.length < 5) {
      stars.push(
        <span key={`empty-${stars.length}`} className="text-gray-300">
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white p-4 border border-gray-200 hover:shadow-lg transition-shadow rounded-sm flex flex-col h-full">
      {/* Product Image */}
      <Link to={`/product/${_id}`} className="block mb-3">
        <img
          src={
            images && images[0] ? images[0] : "https://via.placeholder.com/200"
          }
          alt={Title}
          className="w-full h-48 object-contain"
        />
      </Link>

      {/* Product Title */}
      <Link
        to={`/product/${_id}`}
        className="text-sm font-medium text-gray-900 hover:text-[#C7511F] line-clamp-2 mb-2"
      >
        {Title}
      </Link>

      {/* Rating */}
      {rating > 0 && (
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-sm">{renderStars(rating)}</div>
          <span className="text-sm text-amazon-link hover:text-[#C7511F] cursor-pointer">
            {numReviews.toLocaleString()}
          </span>
        </div>
      )}

      {/* Spacer to push content to bottom */}
      <div className="flex-1"></div>

      {/* Price */}
      <div className="mb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-normal">₹{formatPrice(price)}</span>
          {discountPercent > 0 && (
            <span className="text-xs text-gray-600">
              ({discountPercent}% off)
            </span>
          )}
        </div>
        {discountPercent > 0 && (
          <div className="text-xs text-gray-600">
            <span className="line-through">₹{formatPrice(originalPrice)}</span>
          </div>
        )}
      </div>

      {/* Delivery Info */}
      <div className="text-xs text-gray-700 mb-3">
        <span className="font-semibold">FREE delivery</span> by{" "}
        <span className="font-bold">
          {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(
            "en-IN",
            {
              weekday: "short",
              day: "numeric",
              month: "short",
            }
          )}
        </span>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          addToCart(_id);
        }}
        className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-sm py-1.5 rounded-lg border border-[#FCD200] font-normal"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
