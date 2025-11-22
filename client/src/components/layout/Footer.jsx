import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const Footer = () => {
  const { isAuthenticated } = useAuthStore();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="font-sans">
      {/* Auth Recommendation Section - Only shown when not logged in */}
      {!isAuthenticated && (
        <div className="bg-white py-8 border-t border-gray-200">
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-xl font-bold mb-2 text-gray-700">
              See personalized recommendations
            </p>
            <Link to="/login">
              <button className="w-60 h-7 bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-md text-sm font-semibold shadow-sm">
                Sign in
              </button>
            </Link>
            <p className="text-sm text-gray-700 mt-1">
              New customer?{" "}
              <Link
                to="/signup"
                className="text-amazon-link hover:text-[#C7511F] hover:underline"
              >
                Start here.
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* Back to Top */}
      <div
        onClick={scrollToTop}
        className="bg-[#37475a] hover:bg-[#485769] text-white text-xs font-bold py-4 text-center cursor-pointer transition-colors"
      >
        Back to Top
      </div>

      {/* Main Footer Links */}
      <div className="bg-[#232f3e] text-white py-10 border-b border-[#3a4553]">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          <div>
            <h3 className="font-bold text-base mb-3">Get to Know Us</h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-300">
              <li className="hover:underline cursor-pointer">About Us</li>
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Press Releases</li>
              <li className="hover:underline cursor-pointer">Amazon Science</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-base mb-3">Connect with Us</h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-300">
              <li className="hover:underline cursor-pointer">Facebook</li>
              <li className="hover:underline cursor-pointer">Twitter</li>
              <li className="hover:underline cursor-pointer">Instagram</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-base mb-3">Make Money with Us</h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-300">
              <li className="hover:underline cursor-pointer">Sell on Amazon</li>
              <li className="hover:underline cursor-pointer">
                Sell under Amazon Accelerator
              </li>
              <li className="hover:underline cursor-pointer">
                Protect and Build Your Brand
              </li>
              <li className="hover:underline cursor-pointer">
                Amazon Global Selling
              </li>
              <li className="hover:underline cursor-pointer">
                Become an Affiliate
              </li>
              <li className="hover:underline cursor-pointer">
                Fulfilment by Amazon
              </li>
              <li className="hover:underline cursor-pointer">
                Advertise Your Products
              </li>
              <li className="hover:underline cursor-pointer">
                Amazon Pay on Merchants
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-base mb-3">Let Us Help You</h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-300">
              <li className="hover:underline cursor-pointer">
                COVID-19 and Amazon
              </li>
              <li className="hover:underline cursor-pointer">Your Account</li>
              <li className="hover:underline cursor-pointer">Returns Centre</li>
              <li className="hover:underline cursor-pointer">
                100% Purchase Protection
              </li>
              <li className="hover:underline cursor-pointer">
                Amazon App Download
              </li>
              <li className="hover:underline cursor-pointer">Help</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Logo & Language */}
      <div className="bg-[#232f3e] text-white py-8 border-t border-[#3a4553]">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon"
              className="h-6 object-contain grayscale brightness-200"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-[#ccc]">
            <div className="border border-[#848688] rounded px-2 py-1 flex items-center gap-2 cursor-pointer">
              <span>🌐</span> English
            </div>
            <div className="border border-[#848688] rounded px-2 py-1 flex items-center gap-2 cursor-pointer">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
                alt="India"
                className="w-4 h-3 object-cover"
              />
              India
            </div>
          </div>
        </div>
      </div>

      {/* Very Bottom Footer - Black Section */}
      <div className="bg-[#131a22] text-white py-8 text-xs">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 px-4 mb-8">
          <div>
            <h4 className="font-bold text-[#ddd]">AbeBooks</h4>
            <p className="text-[#999]">Books, art & collectibles</p>
          </div>
          <div>
            <h4 className="font-bold text-[#ddd]">Amazon Web Services</h4>
            <p className="text-[#999]">Scalable Cloud Computing Services</p>
          </div>
          <div>
            <h4 className="font-bold text-[#ddd]">Audible</h4>
            <p className="text-[#999]">Download Audio Books</p>
          </div>
          <div>
            <h4 className="font-bold text-[#ddd]">IMDb</h4>
            <p className="text-[#999]">Movies, TV & Celebrities</p>
          </div>
          <div>
            <h4 className="font-bold text-[#ddd]">Shopbop</h4>
            <p className="text-[#999]">Designer Fashion Brands</p>
          </div>
          <div>
            <h4 className="font-bold text-[#ddd]">Amazon Business</h4>
            <p className="text-[#999]">Everything For Your Business</p>
          </div>
          <div>
            <h4 className="font-bold text-[#ddd]">Prime Now</h4>
            <p className="text-[#999]">2-Hour Delivery on Everyday Items</p>
          </div>
          <div>
            <h4 className="font-bold text-[#ddd]">Amazon Prime Music</h4>
            <p className="text-[#999]">100 million songs, ad-free</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 text-[#ddd]">
          <div className="flex gap-4 flex-wrap justify-center">
            <span className="hover:underline cursor-pointer">
              Conditions of Use & Sale
            </span>
            <span className="hover:underline cursor-pointer">
              Privacy Notice
            </span>
            <span className="hover:underline cursor-pointer">
              Interest-Based Ads
            </span>
          </div>
          <p>
            © 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its
            affiliates
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
