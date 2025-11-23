import React from "react";
import useCartStore from "../../store/useCartStore";
import { CheckCircle } from "lucide-react";
import Button from "../ui/Button";

const CartSubtotal = () => {
  const { cart } = useCartStore();

  // Helper to format price
  const formatPrice = (num) => new Intl.NumberFormat("en-IN").format(num);

  return (
    <div className="bg-white p-3 sm:p-4 border border-gray-200 rounded-lg shadow-sm w-full">
      {/* Free Delivery Message */}
      <div className="flex gap-2 mb-3 sm:mb-4">
        <div className="mt-1 shrink-0">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#067D62] fill-[#067D62]" />
        </div>
        <div className="text-xs sm:text-sm">
          <span className="text-[#067D62] font-medium">
            Part of your order qualifies for FREE Delivery.
          </span>{" "}
          Choose <span className="text-gray-500">FREE Delivery</span> option at
          checkout.
        </div>
      </div>

      {/* Subtotal */}
      <div className="text-base sm:text-lg mb-3 sm:mb-4">
        Subtotal ({cart.totalItems} items):{" "}
        <span className="font-bold">₹{formatPrice(cart.totalPrice)}</span>
      </div>

      {/* Proceed to Buy Button */}
      <Button
        onClick={() => (window.location.href = "/checkout")}
        variant="primary"
        className="mb-3 sm:mb-4 rounded-full min-h-[48px] sm:min-h-0"
      >
        Proceed to Buy
      </Button>

      {/* EMI Option */}
      <div className="border border-gray-300 rounded-md p-2.5 sm:p-3 cursor-pointer hover:bg-gray-50 flex justify-between items-center min-h-[48px] sm:min-h-0">
        <span className="text-xs sm:text-sm font-medium">EMI Available</span>
        <svg
          className="w-4 h-4 text-gray-500 shrink-0"
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
