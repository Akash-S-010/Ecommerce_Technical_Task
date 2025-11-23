import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Package } from "lucide-react";
import orderApi from "../api/orderApi";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AnimatedCheckmark from "../components/common/AnimatedCheckmark";

const OrderSuccessPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await orderApi.getOrderById(id);
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

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

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold mb-4">Order not found</h2>
          <Link to="/" className="text-amazon-link hover:underline">
            Go to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="max-w-[800px] mx-auto p-4 flex-1 w-full min-h-screen">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm animate-fade-in-up">
          <div className="flex flex-col items-center text-center mb-8">
            <AnimatedCheckmark />
            <h1 className="text-2xl font-bold text-[#067D62] mb-2 animate-fade-in-up animate-delay-100 opacity-0">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-600 animate-fade-in-up animate-delay-200 opacity-0">
              Thank you for shopping with us.
            </p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-6 animate-fade-in-up animate-delay-300 opacity-0">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium">{order._id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium">{order.paymentType}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-4">
              <span>Total Amount:</span>
              <span className="text-[#B12704]">
                ₹{new Intl.NumberFormat("en-IN").format(order.totalPrice)}
              </span>
            </div>
          </div>

          <div className="mb-8 animate-fade-in-up animate-delay-300 opacity-0">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" /> Delivery Details
            </h3>
            <div className="bg-gray-50 p-4 rounded text-sm">
              <div className="font-bold mb-1">{order.address.label}</div>
              <div>{order.address.street}</div>
              <div>
                {order.address.city}, {order.address.state} -{" "}
                {order.address.pincode}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 animate-fade-in-up animate-delay-300 opacity-0">
            <Link
              to="/orders"
              className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-md px-6 py-2 text-sm shadow-sm font-medium"
            >
              View Your Orders
            </Link>
            <Link
              to="/products"
              className="border border-gray-300 rounded-md px-6 py-2 text-sm hover:bg-gray-50 font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderSuccessPage;
