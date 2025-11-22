import React, { useState } from "react";

const ProductFilters = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    deliveryDay: null,
    rating: null,
    brands: [],
    priceRange: null,
    discount: null,
    condition: "new",
    payOnDelivery: false,
  });

  const brands = [
    "Samsung",
    "LG",
    "Haier",
    "Daikin",
    "Godrej",
    "IFB",
    "Panasonic",
    "DAWLANCE ELECTRONICS PRIVATE LIMITED",
    "Intelli Retail",
    "DIGI WORLD ELECTRONICS",
    "Kitchen Brand Store",
    "LOVEHOME RETAIL",
  ];

  const priceRanges = [
    { label: "Under ₹10,000", value: "0-10000" },
    { label: "₹10,000 - ₹20,000", value: "10000-20000" },
    { label: "₹20,000 - ₹30,000", value: "20000-30000" },
    { label: "₹30,000 - ₹50,000", value: "30000-50000" },
    { label: "Over ₹50,000", value: "50000-999999" },
  ];

  const discounts = [
    { label: "10% off or more", value: 10 },
    { label: "25% off or more", value: 25 },
    { label: "35% off or more", value: 35 },
    { label: "50% off or more", value: 50 },
    { label: "70% off or more", value: 70 },
  ];

  return (
    <div className="w-64 bg-white p-4 space-y-6 text-sm">
      {/* Delivery Day */}
      <div>
        <h3 className="font-bold text-base mb-3">Delivery Day</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="delivery" className="w-4 h-4" />
          <span>Get it in 2 Days</span>
        </label>
      </div>

      {/* Customer Reviews */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-base mb-3">Customer Reviews</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="rating" className="w-4 h-4" />
            <div className="flex items-center gap-1">
              <div className="flex text-[#FFA41C]">
                {[...Array(4)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
                <span className="text-gray-300">★</span>
              </div>
              <span className="text-gray-600">& up</span>
            </div>
          </label>
        </div>
      </div>

      {/* Brands */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-base mb-3">Brands</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand, index) => (
            <label
              key={index}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-base mb-3">Price</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="price" className="w-4 h-4" />
            <span>All</span>
          </label>
          {priceRanges.map((range, index) => (
            <label
              key={index}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input type="radio" name="price" className="w-4 h-4" />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Deals & Discount */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-base mb-3">Deals & Discount</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span>All Discounts</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span>Today's Deals</span>
          </label>
        </div>
      </div>

      {/* Item Condition */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-base mb-3">Item Condition</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="condition"
            defaultChecked
            className="w-4 h-4"
          />
          <span>New</span>
        </label>
      </div>

      {/* Pay on Delivery */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-base mb-3">Pay on Delivery</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4" />
          <span>Eligible for Pay on Delivery</span>
        </label>
      </div>

      {/* Discount */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-base mb-3">Discount</h3>
        <div className="space-y-2">
          {discounts.map((discount, index) => (
            <label
              key={index}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input type="radio" name="discount" className="w-4 h-4" />
              <span>{discount.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Seller */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-base mb-3">Seller</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span>DAWLANCE ELECTRONICS PRIVATE LIMITED</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span>Intelli Retail</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span>DIGI WORLD ELECTRONICS</span>
          </label>
        </div>
      </div>

      {/* Availability */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-base mb-3">Availability</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4" />
          <span>Include Out of Stock</span>
        </label>
      </div>
    </div>
  );
};

export default ProductFilters;
