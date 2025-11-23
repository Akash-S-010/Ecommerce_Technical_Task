import React, { useEffect, useState } from "react";
import {
  MapPin,
  Search,
  ShoppingCart,
  Menu,
  ChevronDown,
  LogOut,
  Plus,
  User,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import useCartStore from "../../store/useCartStore";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { cart, fetchCart } = useCartStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const greetingText = isAuthenticated
    ? `Hello, ${user?.name}`
    : "Hello, sign in";

  return (
    <header className="w-full z-50">
      {/* Top Bar */}
      <div className="bg-[#131921] text-white h-[60px] flex items-center px-2 sm:px-4 gap-1 sm:gap-2 relative">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden border border-transparent hover:border-white rounded-sm p-2 cursor-pointer"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="border border-transparent hover:border-white rounded-sm p-1 cursor-pointer flex items-center mt-2"
        >
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon"
            className="h-6 sm:h-8 object-contain"
          />
          <span className="text-xs font-bold -mt-3 ml-0.5 text-gray-300">
            .in
          </span>
        </Link>

        {/* Location - Now visible on mobile */}
        <Link
          to="/manage-address"
          className="border border-transparent hover:border-white rounded-sm p-1 sm:p-2 cursor-pointer flex items-center gap-1 leading-tight"
        >
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mt-2" />
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs text-gray-300 ml-0.5 hidden sm:inline">
              {isAuthenticated && user?.addresses?.length > 0
                ? `Delivering to ${user.addresses[0].city} ${user.addresses[0].pincode}`
                : "Delivering to"}
            </span>
            <span className="text-xs sm:text-sm font-bold">Update</span>
          </div>
        </Link>

        {/* Search Bar - Desktop */}
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

        {/* Mobile Search Toggle */}
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="sm:hidden border border-transparent hover:border-white rounded-sm p-2 cursor-pointer"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Language - Hidden on mobile and tablet */}
        <div className="border border-transparent hover:border-white rounded-sm p-2 cursor-pointer hidden lg:flex items-center gap-1">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
            alt="IN"
            className="w-5 h-3 object-cover"
          />
          <span className="font-bold text-sm">EN</span>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </div>

        {/* Account & Lists - Now visible on mobile */}
        <div className="relative group border border-transparent hover:border-white rounded-sm p-1 sm:p-2 cursor-pointer leading-tight">
          <Link to={isAuthenticated ? "" : "/login"}>
            <div className="text-[10px] sm:text-xs text-gray-300 truncate max-w-[60px] sm:max-w-[100px] lg:max-w-none">
              {greetingText}
            </div>
            <div className="text-xs sm:text-sm font-bold flex items-center gap-0.5">
              <span className="hidden sm:inline">Account & Lists</span>
              <span className="sm:hidden">Account</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </Link>

          {/* Dropdown Menu */}
          <div className="absolute top-full right-0 w-48 bg-white rounded-md shadow-lg py-2 hidden group-hover:block z-50 text-black border border-gray-200">
            {isAuthenticated ? (
              <>
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

        {/* Returns & Orders - Now visible on tablet and mobile */}
        <Link
          to="/orders"
          className="border border-transparent hover:border-white rounded-sm p-1 sm:p-2 cursor-pointer leading-tight hidden sm:block"
        >
          <div className="text-[10px] sm:text-xs text-gray-300">Returns</div>
          <div className="text-xs sm:text-sm font-bold">& Orders</div>
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className="border border-transparent hover:border-white rounded-sm p-1 sm:p-2 cursor-pointer flex items-end relative"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="absolute -top-1 right-0 text-[#f08804] font-bold text-xs sm:text-sm bg-[#131921] rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
              {cart.totalItems}
            </span>
          </div>
          <span className="font-bold text-sm mb-1 hidden sm:inline">Cart</span>
        </Link>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="sm:hidden bg-[#131921] px-2 pb-2">
          <div className="flex h-10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#f3a847]">
            <input
              type="text"
              placeholder="Search Amazon.in"
              className="flex-1 px-3 text-black outline-none placeholder-gray-500 bg-white"
            />
            <div className="bg-[#febd69] hover:bg-[#f3a847] w-11 flex items-center justify-center cursor-pointer transition-colors">
              <Search className="w-5 h-5 text-gray-800" />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-white w-[80%] max-w-[350px] h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#232f3e] text-white p-4">
              <div className="flex items-center gap-2">
                <User className="w-8 h-8" />
                <div>
                  <div className="font-bold text-lg">{greetingText}</div>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* Account Section */}
              <div>
                <h3 className="font-bold text-lg mb-2">Your Account</h3>
                <div className="space-y-2">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/orders"
                        className="block py-2 text-gray-700 hover:text-[#C7511F]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Returns & Orders
                      </Link>
                      <Link
                        to="/manage-address"
                        className="block py-2 text-gray-700 hover:text-[#C7511F]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Manage Addresses
                      </Link>
                      <Link
                        to="/add-product"
                        className="block py-2 text-gray-700 hover:text-[#C7511F]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Add Product
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left py-2 text-red-600 hover:text-red-700"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block py-2 text-gray-700 hover:text-[#C7511F]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="block py-2 text-gray-700 hover:text-[#C7511F]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="border-t pt-4">
                <h3 className="font-bold text-lg mb-2">Shop by Category</h3>
                <div className="space-y-2">
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
                      className="py-2 text-gray-700 hover:text-[#C7511F] cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar - Horizontal scroll on mobile */}
      <div className="bg-[#232f3e] text-white h-[40px] flex items-center px-2 sm:px-4 gap-2 sm:gap-4 text-xs sm:text-sm overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 font-bold cursor-pointer border border-transparent hover:border-white p-1 rounded-sm whitespace-nowrap">
          <Menu className="w-4 h-4 sm:w-5 sm:h-5" /> All
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
