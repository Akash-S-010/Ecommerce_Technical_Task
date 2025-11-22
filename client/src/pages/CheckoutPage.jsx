import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import useAuthStore from "../store/useAuthStore";
import orderApi from "../api/orderApi";
import toast from "react-hot-toast";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { MapPin, CreditCard } from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, fetchCart } = useCartStore();
  const { user } = useAuthStore();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchCart();
    if (user?.addresses?.length > 0) {
      setSelectedAddress(user.addresses[0]);
    }

    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [fetchCart, user]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    setIsProcessing(true);
    try {
      const orderData = {
        items: cart.items.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
        address: selectedAddress,
        paymentType: paymentMethod,
      };

      const response = await orderApi.placeOrder(orderData);

      if (paymentMethod === "COD") {
        toast.success("Order placed successfully!");
        fetchCart(); // Refresh cart to update header count
        navigate(`/order-success/${response.order._id}`);
      } else {
        // Razorpay Payment Flow
        const {
          data: { key },
        } = await orderApi.getRazorpayKey();

        const options = {
          key: key,
          amount: response.order.totalPrice * 100,
          currency: "INR",
          name: "Amazon Clone",
          description: "Test Transaction",
          order_id: response.razorpayOrderId,
          handler: async function (paymentResponse) {
            try {
              await orderApi.updatePaymentStatus(response.order._id, "paid");
            } catch (e) {
              console.error("Payment status update failed", e);
            }
            toast.success("Payment Successful!");
            fetchCart(); // Refresh cart to update header count
            navigate(`/order-success/${response.order._id}`);
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.phone,
          },
          theme: {
            color: "#232F3E",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          toast.error(response.error.description);
        });
        rzp1.open();
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link to="/" className="text-amazon-link hover:underline">
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="max-w-[1200px] mx-auto p-4 flex-1 w-full">
        <h1 className="text-2xl font-medium mb-6">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Details */}
          <div className="flex-1 space-y-6">
            {/* 1. Delivery Address */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span className="text-[#e77600]">1</span> Delivery Address
                </h2>
                <Link
                  to="/manage-address"
                  className="text-sm text-amazon-link hover:underline"
                >
                  Change
                </Link>
              </div>

              {user?.addresses?.length > 0 ? (
                <div className="pl-6">
                  {user.addresses.map((addr, idx) => (
                    <div key={idx} className="flex items-start gap-2 mb-2">
                      <input
                        type="radio"
                        name="address"
                        id={`addr-${idx}`}
                        checked={selectedAddress === addr}
                        onChange={() => setSelectedAddress(addr)}
                        className="mt-1 text-[#e77600] focus:ring-[#e77600]"
                      />
                      <label htmlFor={`addr-${idx}`} className="text-sm">
                        <span className="font-bold">{user.name}</span>
                        <br />
                        {addr.label}, {addr.street}
                        <br />
                        {addr.city}, {addr.state} {addr.pincode}
                        <br />
                        Phone: {user.phone || "N/A"}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pl-6 text-sm">
                  No address found.{" "}
                  <Link
                    to="/manage-address"
                    className="text-amazon-link hover:underline"
                  >
                    Add an address
                  </Link>
                </div>
              )}
            </div>

            {/* 2. Payment Method */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                <span className="text-[#e77600]">2</span> Payment Method
              </h2>

              <div className="pl-6 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    id="cod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-[#e77600] focus:ring-[#e77600]"
                  />
                  <label htmlFor="cod" className="text-sm font-medium">
                    Cash on Delivery / Pay on Delivery
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    id="razorpay"
                    value="Razorpay"
                    checked={paymentMethod === "Razorpay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-[#e77600] focus:ring-[#e77600]"
                  />
                  <label
                    htmlFor="razorpay"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    Razorpay (UPI, Cards, NetBanking)
                    <CreditCard className="w-4 h-4 text-gray-500" />
                  </label>
                </div>
              </div>
            </div>

            {/* 3. Review Items */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                <span className="text-[#e77600]">3</span> Review items and
                delivery
              </h2>

              <div className="pl-6">
                {cart.items.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex gap-4 mb-4 border-b border-gray-100 pb-4 last:border-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.Title}
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {item.product.Title}
                      </div>
                      <div className="text-sm text-[#B12704] font-bold">
                        ₹
                        {new Intl.NumberFormat("en-IN").format(
                          item.product.price
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-[300px] shrink-0">
            <div className="bg-white p-4 rounded-lg border border-gray-200 sticky top-4">
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className={`w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-md py-2 text-sm shadow-sm mb-4 ${
                  isProcessing ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isProcessing ? "Placing Order..." : "Place Your Order"}
              </button>

              <div className="text-xs text-center text-gray-500 mb-4">
                By placing your order, you agree to Amazon's{" "}
                <span className="text-amazon-link">privacy notice</span> and{" "}
                <span className="text-amazon-link">conditions of use</span>.
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                <h3 className="font-bold text-lg mb-2">Order Summary</h3>
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>
                    ₹{new Intl.NumberFormat("en-IN").format(cart.totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-[#B12704] text-lg">
                  <span>Order Total:</span>
                  <span>
                    ₹{new Intl.NumberFormat("en-IN").format(cart.totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
