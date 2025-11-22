import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import useCartStore from "../store/useCartStore.js";
import CartItem from "../components/cart/CartItem";
import CartSubtotal from "../components/cart/CartSubtotal";
import DetailedProductScroll from "../components/home/DetailedProductScroll";

const CartPage = () => {
  const { cart, fetchCart, isLoading } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (isLoading && cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e77600]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="max-w-[1500px] mx-auto p-4 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Cart Items */}
          <div className="flex-1">
            <div className="bg-white p-6 mb-6">
              <div className="flex justify-between items-end border-b border-gray-200 mb-4 pb-4">
                <h1 className="text-3xl font-medium text-gray-900 mb">
                  Shopping Cart
                </h1>
                <span className="text-sm text-gray-500">Price</span>
              </div>

              {cart.items.length === 0 ? (
                <div className="py-8">
                  <p className="text-lg mb-4">Your Amazon Cart is empty.</p>
                  <Link to="/" className="text-amazon-link hover:underline">
                    Shop today's deals
                  </Link>

                  <div className="mt-8 flex gap-4">
                    {!localStorage.getItem("token") && (
                      <>
                        <Link
                          to="/login"
                          className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-md px-4 py-1.5 text-sm shadow-sm text-gray-900"
                        >
                          Sign in to your account
                        </Link>
                        <Link
                          to="/signup"
                          className="border border-gray-300 rounded-md px-4 py-1.5 text-sm hover:bg-gray-50 text-gray-900"
                        >
                          Sign up now
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-0">
                  {cart.items.map((item) => (
                    <CartItem key={item.product._id} item={item} />
                  ))}

                  <div className="text-right text-lg pt-4">
                    Subtotal ({cart.totalItems} items):{" "}
                    <span className="font-bold">
                      ₹{new Intl.NumberFormat("en-IN").format(cart.totalPrice)}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="h-8"></div> {/* Spacer */}
          </div>

          {/* Right Column: Subtotal & Recommendations */}
          <div className="lg:w-[300px] space-y-4">
            {cart.items.length > 0 && <CartSubtotal />}

            {/* Recommendations (Dummy for now, matching image layout) */}
            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
              <h3 className="font-bold text-sm mb-4">
                Customers Who Brought Items in Your Recent History Also Bought
              </h3>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <img
                    src="https://m.media-amazon.com/images/I/71fGUj6SDaL._AC_UL480_FMwebp_QL65_.jpg"
                    alt="Recommendation"
                    className="w-20 h-20 object-contain"
                  />
                  <div className="text-sm">
                    <div className="text-amazon-link hover:underline line-clamp-2 mb-1">
                      Trendyol womens Seasonal Fashion Dress...
                    </div>
                    <div className="text-[#FFA41C] text-xs mb-1">★★★★☆ 43</div>
                    <div className="text-[#B12704] font-medium">SAR 69.70</div>
                    <button className="mt-1 text-xs border border-gray-300 rounded-md px-2 py-0.5 bg-gray-50 hover:bg-gray-100">
                      See all buying options
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://m.media-amazon.com/images/I/71627hCfdiL._AC_UL480_FMwebp_QL65_.jpg"
                    alt="Recommendation"
                    className="w-20 h-20 object-contain"
                  />
                  <div className="text-sm">
                    <div className="text-amazon-link hover:underline line-clamp-2 mb-1">
                      Tommy Hilfiger Women's Sleeveless Fit and Flare Dress
                    </div>
                    <div className="text-[#FFA41C] text-xs mb-1">★★★★☆ 29</div>
                    <div className="text-[#B12704] font-medium">
                      SAR 469.70 - SAR 657.00
                    </div>
                    <button className="mt-1 text-xs border border-gray-300 rounded-md px-2 py-0.5 bg-gray-50 hover:bg-gray-100">
                      See all buying options
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Recommendations */}
        <div className="mt-8">
          <DetailedProductScroll title="You might also like" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
