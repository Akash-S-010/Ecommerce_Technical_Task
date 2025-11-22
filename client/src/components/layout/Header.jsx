import React from "react";
import { MapPin, Search, ShoppingCart, Menu, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const Header = () => {
  const { user, isAuthenticated } = useAuthStore();

  const greetingText = isAuthenticated
    ? `Hello, ${user?.name}`
    : "Hello, sign in";

  return (
    <header className="w-full z-50">
      {/* Top Bar */}
      <div className="bg-[#131921] text-white h-[60px] flex items-center px-4 gap-2">
        {/* Logo */}
        <Link
          to="/"
          className="border border-transparent hover:border-white rounded-sm p-1 cursor-pointer flex items-center mt-2"
        >
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon"
            className="h-8 object-contain"
          />
          <span className="text-xs font-bold -mt-3 ml-0.5 text-gray-300">
            .in
          </span>
        </Link>

        {/* Location */}
        <Link
          to="/manage-address"
          className="border border-transparent hover:border-white rounded-sm p-2 cursor-pointer hidden md:flex items-center gap-1 leading-tight"
        >
          <MapPin className="w-4 h-4 mt-2" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-300 ml-0.5">
              {isAuthenticated && user?.addresses?.length > 0
                ? `Delivering to ${user.addresses[0].city} ${user.addresses[0].pincode}`
                : "Delivering to"}
            </span>
            <span className="text-sm font-bold">Update location</span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 h-10 hidden sm:flex rounded-md overflow-hidden focus-within:ring-3 focus-within:ring-[#f3a847]">
          <div className="bg-[#f3f3f3] text-gray-600 px-3 flex items-center text-xs border-r border-gray-300 cursor-pointer hover:bg-[#dadada] transition-colors">
            All <ChevronDown className="w-3 h-3 ml-1" />
          </div>
          <input
            type="text"
            placeholder="Search Amazon.in"
            className="flex-1 px-3 text-black outline-none placeholder-gray-500"
          />
          <div className="bg-[#febd69] hover:bg-[#f3a847] w-11 flex items-center justify-center cursor-pointer transition-colors">
            <Search className="w-5 h-5 text-gray-800" />
          </div>
        </div>

        {/* Language */}
        <div className="border border-transparent hover:border-white rounded-sm p-2 cursor-pointer hidden lg:flex items-center gap-1">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
            alt="IN"
            className="w-5 h-3 object-cover"
          />
          <span className="font-bold text-sm">EN</span>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </div>

        {/* Account & Lists */}
        <Link
          to={isAuthenticated ? "/profile" : "/login"}
          className="border border-transparent hover:border-white rounded-sm p-2 cursor-pointer leading-tight"
        >
          <div className="text-xs text-gray-300">{greetingText}</div>
          <div className="text-sm font-bold flex items-center gap-0.5">
            Account & Lists <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
        </Link>

        {/* Returns & Orders */}
        <div className="border border-transparent hover:border-white rounded-sm p-2 cursor-pointer leading-tight hidden sm:block">
          <div className="text-xs text-gray-300">Returns</div>
          <div className="text-sm font-bold">& Orders</div>
        </div>

        {/* Cart */}
        <div className="border border-transparent hover:border-white rounded-sm p-2 cursor-pointer flex items-end relative">
          <div className="relative">
            <ShoppingCart className="w-8 h-8" />
            <span className="absolute -top-1 right-0 text-[#f08804] font-bold text-sm bg-[#131921] rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </div>
          <span className="font-bold text-sm mb-1 hidden sm:inline">Cart</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#232f3e] text-white h-[40px] flex items-center px-4 gap-4 text-sm overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 font-bold cursor-pointer border border-transparent hover:border-white p-1 rounded-sm whitespace-nowrap">
          <Menu className="w-5 h-5" /> All
        </div>
        {[
          "Amazon miniTV",
          "Sell",
          "Best Sellers",
          "Mobiles",
          "Today's Deals",
          "Customer Service",
          "Electronics",
          "Prime",
          "New Releases",
          "Home & Kitchen",
          "Gift Ideas",
        ].map((item) => (
          <div
            key={item}
            className="cursor-pointer border border-transparent hover:border-white p-1 rounded-sm whitespace-nowrap"
          >
            {item}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
