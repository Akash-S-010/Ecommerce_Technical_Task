import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const ProductBuyBox = ({ product, user }) => {
  return (
    <div className="lg:w-[20%]">
      <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
        <div className="text-3xl font-medium text-gray-900 mb-2 flex">
          <span className="text-sm ">₹</span>
          {Math.floor(product.price)}
          <span className="text-sm">
            {(product.price % 1).toFixed(2).substring(2)}
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-2">
          Free delivery{" "}
          <span className="font-bold text-gray-900">6-9 October</span>.
        </div>

        <div className="text-sm text-amazon-link hover:underline cursor-pointer mb-4">
          Details
        </div>

        <Link
          to="/manage-address"
          className="flex items-start gap-2 text-xs text-amazon-link hover:underline cursor-pointer mb-4"
        >
          <MapPin className="w-4 h-4 text-gray-900 mt-0.5" />
          <div>
            Delivery to {user?.addresses?.[0]?.city || "Select Location"} -
            Update Location
          </div>
        </Link>

        <div className="text-lg text-[#B12704] font-medium mb-2">
          Usually ships within 4 to 5 days
        </div>

        <div className="bg-gray-100 border border-gray-300 rounded p-2 mb-4 relative">
          <div className="text-xs font-bold mb-1">International Shipping</div>
          <div className="text-xs text-gray-600">
            Ships from outside the India.
          </div>
          <div className="text-xs text-amazon-link hover:underline cursor-pointer mt-1">
            Learn more
          </div>
          <div className="absolute -right-2 top-2 w-4 h-4 bg-white transform rotate-45 border-t border-r border-gray-300"></div>
        </div>

        <div className="mb-4">
          <select className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm bg-[#F0F2F2] hover:bg-[#E3E6E6] cursor-pointer focus:ring-1 focus:ring-[#e77600] focus:border-[#e77600] outline-none">
            <option>Quantity: 1</option>
            {[...Array(9)].map((_, i) => (
              <option key={i + 2} value={i + 2}>
                {i + 2}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3 mb-4">
          <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-2 text-sm shadow-sm">
            Add to Cart
          </button>
          <button className="w-full bg-[#FFA41C] hover:bg-[#FA8900] border border-[#FF8F00] rounded-full py-2 text-sm shadow-sm">
            Buy Now
          </button>
        </div>

        <div className="text-xs text-gray-600 space-y-2 mb-4">
          <div className="grid grid-cols-[auto_1fr] gap-x-2">
            <span className="text-gray-500">Ships from</span>
            <span>Monatik LLC</span>
            <span className="text-gray-500">Sold by</span>
            <span className="text-amazon-link hover:underline cursor-pointer">
              Monatik LLC
            </span>
            <span className="text-gray-500">Payment</span>
            <span className="text-amazon-link hover:underline cursor-pointer">
              Secure transaction
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button className="w-full border border-gray-300 rounded-md py-1 text-sm hover:bg-gray-50 text-center px-3 shadow-sm">
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBuyBox;
