import React from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartStore.js";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();
  const { product, quantity } = item;

  // Helper to format price
  const formatPrice = (num) => new Intl.NumberFormat("en-IN").format(num);

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 py-4 border-b border-gray-200 last:border-0">
      {/* Image */}
      <div className="w-full sm:w-[140px] md:w-[180px] h-[200px] sm:h-[140px] md:h-[180px] shrink-0">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.images?.[0] || "https://via.placeholder.com/180"}
            alt={product.Title}
            className="w-full h-full object-contain"
          />
        </Link>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
          <div className="space-y-1 flex-1 min-w-0">
            <Link
              to={`/product/${product._id}`}
              className="text-base sm:text-lg font-medium text-gray-900 hover:text-[#C7511F] hover:underline line-clamp-2"
            >
              {product.Title}
            </Link>

            <div className="text-xs text-[#007600] font-medium">In stock</div>
            <div className="text-xs text-gray-500">
              <span className="font-bold text-gray-900">FREE delivery</span>{" "}
              available at checkout
            </div>

            <div className="text-xs mt-1">
              <span className="font-bold">Colour:</span> Black
            </div>
            <div className="text-xs">
              <span className="font-bold">Style Name:</span>{" "}
              {product.Title.split(" ").slice(0, 2).join(" ")}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-4">
              <select
                value={quantity}
                onChange={(e) =>
                  updateQuantity(product._id, parseInt(e.target.value))
                }
                className="bg-[#F0F2F2] border border-[#D5D9D9] rounded-md shadow-sm py-1.5 sm:py-1 px-2 text-sm hover:bg-[#E3E6E6] cursor-pointer focus:ring-1 focus:ring-[#e77600] focus:border-[#e77600] outline-none min-h-[44px] sm:min-h-0"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Qty: {i + 1}
                  </option>
                ))}
              </select>

              <div className="hidden sm:block h-4 border-l border-gray-300"></div>

              <button
                onClick={() => removeFromCart(product._id)}
                className="text-xs sm:text-sm text-amazon-link hover:underline min-h-[44px] sm:min-h-0 px-2 sm:px-0"
              >
                Delete
              </button>

              <div className="hidden sm:block h-4 border-l border-gray-300"></div>

              <button className="text-xs sm:text-sm text-amazon-link hover:underline min-h-[44px] sm:min-h-0 px-2 sm:px-0">
                Save for later
              </button>

              <div className="hidden md:block h-4 border-l border-gray-300"></div>

              <button className="text-xs sm:text-sm text-amazon-link hover:underline min-h-[44px] sm:min-h-0 px-2 sm:px-0 hidden md:inline">
                See more like this
              </button>

              <div className="hidden md:block h-4 border-l border-gray-300"></div>

              <button className="text-xs sm:text-sm text-amazon-link hover:underline min-h-[44px] sm:min-h-0 px-2 sm:px-0 hidden md:inline">
                Share
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="text-right sm:text-right w-full sm:w-auto">
            <div className="text-xl sm:text-lg font-bold text-gray-900">
              <sup className="text-xs">₹</sup>
              {formatPrice(product.price)}
            </div>
            <div className="text-xs text-gray-500 hidden sm:block">
              Buy 2 items, get 2% off
            </div>
            <div className="text-xs text-amazon-link hover:underline cursor-pointer hidden sm:block">
              Shop items
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
