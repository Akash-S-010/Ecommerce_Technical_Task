import React, { useEffect } from "react";
import {
  MapPin,
  Search,
  ShoppingCart,
  Menu,
  ChevronDown,
  LogOut,
  Plus,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import useCartStore from "../../store/useCartStore";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { cart, fetchCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
            className="flex-1 px-3 text-black outline-none placeholder-gray-500 bg-white"
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
        <div className="relative group border border-transparent hover:border-white rounded-sm p-2 cursor-pointer leading-tight">
          <Link to={isAuthenticated ? "/business-account" : "/login"}>
            <div className="text-xs text-gray-300">{greetingText}</div>
            <div className="text-sm font-bold flex items-center gap-0.5">
              Account & Lists <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </Link>

          {/* Dropdown Menu */}
          <div className="absolute top-full right-0 w-48 bg-white rounded-md shadow-lg py-2 hidden group-hover:block z-50 text-black border border-gray-200">
            {isAuthenticated ? (
              <>
                <Link
                  to="/business-account"
                  className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <User className="w-4 h-4" /> Your Account
                </Link>
                <Link
                  to="/orders"
                  className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <ShoppingBagIcon className="w-4 h-4" /> Your Orders
                </Link>
                <Link
                  to="/add-product"
                  className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Product
                </Link>
                <div className="border-t my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 text-red-600"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <div className="px-4 py-2 text-center">
                <Link
                  to="/login"
                  className="block bg-[#FFD814] hover:bg-[#F7CA00] text-black text-sm font-medium py-1 rounded-md mb-2"
                >
                  Sign in
                </Link>
                <p className="text-xs text-gray-600">
                  New customer?{" "}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    Start here.
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Returns & Orders */}
        <Link
          to="/orders"
          className="border border-transparent hover:border-white rounded-sm p-2 cursor-pointer leading-tight hidden sm:block"
        >
          <div className="text-xs text-gray-300">Returns</div>
          <div className="text-sm font-bold">& Orders</div>
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className="border border-transparent hover:border-white rounded-sm p-2 cursor-pointer flex items-end relative"
        >
          <div className="relative">
            <ShoppingCart className="w-8 h-8" />
            <span className="absolute -top-1 right-0 text-[#f08804] font-bold text-sm bg-[#131921] rounded-full w-5 h-5 flex items-center justify-center">
              {cart.totalItems}
            </span>
          </div>
          <span className="font-bold text-sm mb-1 hidden sm:inline">Cart</span>
        </Link>
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

// Helper Icon Component since ShoppingBag isn't imported from lucide-react in the top import
const ShoppingBagIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export default Header;
