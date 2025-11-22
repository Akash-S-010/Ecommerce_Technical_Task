import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import orderApi from "../api/orderApi";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderApi.getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
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

      <main className="max-w-[1000px] mx-auto p-4 flex-1 w-full">
        <h1 className="text-2xl font-medium mb-6">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
            <p className="text-lg text-gray-600 mb-4">
              You haven't placed any orders yet.
            </p>
            <Link to="/" className="text-amazon-link hover:underline">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-100 p-4 flex flex-wrap gap-4 justify-between text-sm text-gray-600 border-b border-gray-200">
                  <div className="flex gap-8">
                    <div>
                      <div className="uppercase text-xs font-bold">
                        Order Placed
                      </div>
                      <div>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="uppercase text-xs font-bold">Total</div>
                      <div>
                        ₹
                        {new Intl.NumberFormat("en-IN").format(
                          order.totalPrice
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="uppercase text-xs font-bold">Ship To</div>
                      <div className="text-amazon-link hover:underline cursor-pointer">
                        {order.address.label}
                      </div>
                    </div>
                    <div>
                      <div className="uppercase text-xs font-bold">
                        Payment Status
                      </div>
                      <div
                        className={`font-bold ${
                          order.paymentType === "Razorpay" &&
                          order.paymentStatus === "paid"
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {order.paymentType === "Razorpay"
                          ? order.paymentStatus === "paid"
                            ? "Paid"
                            : "Pending"
                          : "Pay on Delivery"}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="uppercase text-xs font-bold">
                      Order # {order._id}
                    </div>
                    <div className="text-amazon-link hover:underline cursor-pointer">
                      View order details
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-[#067D62]">
                    Arriving by{" "}
                    {new Date(
                      new Date(order.createdAt).setDate(
                        new Date(order.createdAt).getDate() + 5
                      )
                    ).toLocaleDateString()}
                  </h3>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 mt-4">
                      <img
                        src={
                          item.product?.images?.[0] ||
                          "https://via.placeholder.com/100"
                        }
                        alt={item.product?.Title || "Product"}
                        className="w-20 h-20 object-contain"
                      />
                      <div className="flex-1">
                        <Link
                          to={`/product/${item.product?._id}`}
                          className="text-amazon-link font-medium hover:underline line-clamp-2"
                        >
                          {item.product?.Title || "Product Unavailable"}
                        </Link>
                        <div className="text-xs text-gray-500 mt-1">
                          Qty: {item.quantity}
                        </div>
                        <div className="mt-2">
                          <button className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-md px-3 py-1 text-xs shadow-sm">
                            Buy it again
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
