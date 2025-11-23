import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const ProductFilters = ({ filters, onFilterChange, availableBrands }) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || "");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange("search", searchTerm);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm, onFilterChange]);

  const priceRanges = [
    { label: "Under ₹500", value: "0-500" },
    { label: "₹500 - ₹1,000", value: "500-1000" },
    { label: "₹1,000 - ₹10,000", value: "1000-10000" },
    { label: "₹10,000 - ₹20,000", value: "10000-20000" },
    { label: "Over ₹20,000", value: "20000-999999" },
  ];

  const handleBrandChange = (brand) => {
    const currentBrands = filters.brands || [];
    const newBrands = currentBrands.includes(brand)
      ? currentBrands.filter((b) => b !== brand)
      : [...currentBrands, brand];
    onFilterChange("brands", newBrands);
  };

  return (
    <div className="w-64 bg-white p-4 space-y-6 text-sm border-r border-gray-200 h-full overflow-x-hidden">
      {/* Search */}
      <div>
        <h3 className="font-bold text-base mb-3">Search</h3>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e77600] focus:border-transparent outline-none"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Price */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-base mb-3">Price</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:text-[#e77600]">
            <input
              type="radio"
              name="price"
              checked={!filters.priceRange}
              onChange={() => onFilterChange("priceRange", null)}
              className="w-4 h-4 text-[#e77600] focus:ring-[#e77600]"
            />
            <span>All Prices</span>
          </label>
          {priceRanges.map((range, index) => (
            <label
              key={index}
              className="flex items-center gap-2 cursor-pointer hover:text-[#e77600]"
            >
              <input
                type="radio"
                name="price"
                checked={filters.priceRange === range.value}
                onChange={() => onFilterChange("priceRange", range.value)}
                className="w-4 h-4 text-[#e77600] focus:ring-[#e77600]"
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-base mb-3">Brands</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {availableBrands.length === 0 ? (
            <p className="text-gray-500 text-xs">No brands available</p>
          ) : (
            availableBrands.map((brand, index) => (
              <label
                key={index}
                className="flex items-center gap-2 cursor-pointer hover:text-[#e77600]"
              >
                <input
                  type="checkbox"
                  checked={(filters.brands || []).includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="w-4 h-4 text-[#e77600] rounded focus:ring-[#e77600]"
                />
                <span className="capitalize">{brand}</span>
              </label>
            ))
          )}
        </div>
      </div>

      {/* Customer Reviews (Dummy) */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-base mb-3">Avg. Customer Review</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 cursor-pointer hover:text-[#e77600]"
            >
              <input
                type="radio"
                name="rating"
                className="w-4 h-4 text-[#e77600] focus:ring-[#e77600]"
              />
              <div className="flex items-center gap-1">
                <div className="flex text-[#FFA41C]">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < rating ? "text-[#FFA41C]" : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">& up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Item Condition (Dummy) */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-base mb-3">Condition</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:text-[#e77600]">
            <input
              type="checkbox"
              className="w-4 h-4 text-[#e77600] rounded focus:ring-[#e77600]"
            />
            <span>New</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-[#e77600]">
            <input
              type="checkbox"
              className="w-4 h-4 text-[#e77600] rounded focus:ring-[#e77600]"
            />
            <span>Renewed</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
