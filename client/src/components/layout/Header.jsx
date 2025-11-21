import React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, MapPin, Menu, ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full">
      {/* Top Bar - Dark Blue Background */}
      <div className="bg-[#131921] text-white h-[60px] flex items-center px-4 gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center hover:border hover:border-white p-1 rounded-sm"
        >
          <img
            src="/logo_dark.png"
            alt="Amazon"
            className="h-8 mt-2 object-contain"
          />
          <span className="text-xs text-gray-300 self-start ml-1">.in</span>
        </Link>

        {/* Location Picker */}
        <div className="hidden md:flex flex-col justify-center hover:border hover:border-white p-1 rounded-sm cursor-pointer leading-tight min-w-[140px]">
          <span className="text-[#cccccc] text-xs ml-4">
            Delivering to Surat 394210
          </span>
          <div className="flex items-center font-bold text-sm">
            <MapPin size={15} className="mr-1" />
            <span>Update location</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex h-10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#f3a847]">
          {/* Category Dropdown */}
          <button className="bg-[#f3f3f3] text-gray-600 px-3 text-xs border-r border-gray-300 hover:bg-[#dadada] flex items-center gap-1 rounded-l-md">
            All <ChevronDown size={10} fill="currentColor" />
          </button>

          {/* Input */}
          <input
            type="text"
            className="flex-1 px-3 text-black outline-none bg-white placeholder-gray-500"
            placeholder="Search Amazon.in"
          />

          {/* Search Button */}
          <button className="bg-[#febd69] hover:bg-[#f3a847] px-4 flex items-center justify-center rounded-r-md">
            <Search size={20} className="text-gray-800" />
          </button>
        </div>

        {/* Language Selector */}
        <div className="hidden md:flex items-center hover:border hover:border-white p-2 rounded-sm cursor-pointer font-bold text-sm gap-1">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
            alt="India"
            className="w-5 h-3.5 object-cover"
          />
          <span>EN</span>
          <ChevronDown size={10} className="text-gray-400" />
        </div>

        {/* Account & Lists */}
        <div className="hidden md:flex flex-col justify-center hover:border hover:border-white p-2 rounded-sm cursor-pointer leading-tight">
          <span className="text-xs">Hello, sign in</span>
          <div className="flex items-center font-bold text-sm">
            <span>Account & Lists</span>
            <ChevronDown size={10} className="ml-1 text-gray-400" />
          </div>
        </div>

        {/* Returns & Orders */}
        <div className="hidden md:flex flex-col justify-center hover:border hover:border-white p-2 rounded-sm cursor-pointer leading-tight">
          <span className="text-xs">Returns</span>
          <span className="font-bold text-sm">& Orders</span>
        </div>

        {/* Cart */}
        <Link
          to="/cart"
          className="flex items-end hover:border hover:border-white p-2 rounded-sm cursor-pointer"
        >
          <div className="relative">
            <ShoppingCart size={28} />
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[#f08804] font-bold text-xs">
              0
            </span>
          </div>
          <span className="font-bold text-sm mb-1 ml-1 hidden md:inline">
            Cart
          </span>
        </Link>
      </div>

      {/* Bottom Bar - Navigation */}
      <div className="bg-[#232f3e] text-white h-[40px] flex items-center px-4 text-sm gap-4 overflow-x-auto">
        <div className="flex items-center gap-1 font-bold hover:border hover:border-white p-1 rounded-sm cursor-pointer whitespace-nowrap">
          <Menu size={20} />
          <span>All</span>
        </div>

        {[
          "Amazon miniTV",
          "Sell",
          "Best Sellers",
          "Today's Deals",
          "Mobiles",
          "Customer Service",
          "Prime",
          "Electronics",
          "Fashion",
          "New Releases",
          "Home & Kitchen",
          "Amazon Pay",
        ].map((item) => (
          <div
            key={item}
            className="hover:border hover:border-white p-1 rounded-sm cursor-pointer whitespace-nowrap flex items-center gap-1"
          >
            {item}
            {item === "Prime" && (
              <ChevronDown size={10} className="text-gray-400" />
            )}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
