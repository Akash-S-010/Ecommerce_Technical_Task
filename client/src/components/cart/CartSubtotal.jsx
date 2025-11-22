import React from "react";
import useCartStore from "../../store/useCartStore";
import { CheckCircle } from "lucide-react";

const CartSubtotal = () => {
  const { cart } = useCartStore();

  // Helper to format price
  const formatPrice = (num) => new Intl.NumberFormat("en-IN").format(num);

  return (
    <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
      {/* Free Delivery Message */}
      <div className="flex gap-2 mb-4">
        <div className="mt-1">
          <CheckCircle className="w-5 h-5 text-[#067D62] fill-[#067D62]" />
        </div>
        <div className="text-sm">
          <span className="text-[#067D62] font-medium">
            Part of your order qualifies for FREE Delivery.
          </span>{" "}
          Choose <span className="text-gray-500">FREE Delivery</span> option at
          checkout.
        </div>
      </div>

      {/* Subtotal */}
      <div className="text-lg mb-4">
        Subtotal ({cart.totalItems} items):{" "}
        <span className="font-bold">₹{formatPrice(cart.totalPrice)}</span>
      </div>

      {/* Proceed to Buy Button */}
      <button
        onClick={() => (window.location.href = "/checkout")}
        className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-2 text-sm shadow-sm mb-4"
      >
        Proceed to Buy
      </button>

      {/* EMI Option */}
      <div className="border border-gray-300 rounded-md p-3 cursor-pointer hover:bg-gray-50 flex justify-between items-center">
        <span className="text-sm font-medium">EMI Available</span>
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default CartSubtotal;
