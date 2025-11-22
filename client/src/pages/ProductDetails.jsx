import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CategoryNav from "../components/products/CategoryNav";
import productApi from "../api/productApi";
import { MapPin, Lock, ShieldCheck } from "lucide-react";
import ReviewModal from "../components/products/ReviewModal";
import toast from "react-hot-toast";
import useAuthStore from "../store/useAuthStore";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productApi.getProductById(id);
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleReviewSubmit = async (reviewData) => {
    try {
      setIsSubmittingReview(true);
      const response = await productApi.addProductReview(id, reviewData);
      setProduct(response.product); // Update product with new review
      setIsReviewModalOpen(false);
      toast.success("Review submitted successfully");
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f08804]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CategoryNav />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-600 text-lg">{error || "Product not found"}</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Helper to format price
  const formatPrice = (num) => new Intl.NumberFormat("en-IN").format(num);

  // Helper to render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++)
      stars.push(
        <span key={i} className="text-[#FFA41C]">
          ★
        </span>
      );
    if (hasHalfStar)
      stars.push(
        <span key="half" className="text-[#FFA41C]">
          ★
        </span>
      );
    while (stars.length < 5)
      stars.push(
        <span key={`empty-${stars.length}`} className="text-gray-300">
          ★
        </span>
      );
    return stars;
  };

  // Dummy data for UI matching
  const originalPrice = Math.round(product.price * 1.3);
  const discountPercent = Math.round(
    ((originalPrice - product.price) / originalPrice) * 100
  );
  const deliveryDate = new Date(
    Date.now() + 3 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <CategoryNav />

      {/* Breadcrumb (Dummy) */}
      <main className="max-w-[1500px] mx-auto p-4 flex-1 w-full pt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Images */}
          <div className="lg:w-[40%] flex gap-4 sticky top-4 self-start">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {product.images &&
                product.images.map((img, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setSelectedImage(img)}
                    className={`w-10 h-10 border rounded cursor-pointer p-1 flex items-center justify-center ${
                      selectedImage === img
                        ? "border-[#e77600] shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
                        : "border-gray-300 hover:border-[#e77600]"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center border border-gray-100 bg-white min-h-[500px]">
              <img
                src={selectedImage || "https://via.placeholder.com/500"}
                alt={product.Title}
                className="max-w-full max-h-[500px] object-contain"
              />
            </div>
          </div>

          {/* Middle Column: Product Info */}
          <div className="lg:w-[40%] flex flex-col gap-2">
            <h1 className="text-2xl font-medium text-gray-900 leading-tight">
              {product.Title}
            </h1>

            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="text-amazon-link hover:text-[#C7511F] hover:underline cursor-pointer">
                {product.numReviews} ratings
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-amazon-link hover:text-[#C7511F] hover:underline cursor-pointer">
                Search this page
              </span>
            </div>

            <div className="border-t border-gray-200 my-2"></div>

            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-red-700 text-xl font-light">
                  -{discountPercent}%
                </span>
                <span className="text-3xl font-medium text-gray-900">
                  <sup className="text-sm">₹</sup>
                  {formatPrice(product.price)}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                M.R.P.:{" "}
                <span className="line-through">
                  ₹{formatPrice(originalPrice)}
                </span>
              </div>
              <div className="text-sm text-gray-900">
                Inclusive of all taxes
              </div>
            </div>

            {/* Offers (Dummy) */}
            <div className="my-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-sm text-gray-900">Offers</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="min-w-[150px] border border-gray-300 rounded-md p-3 shadow-sm text-sm"
                  >
                    <div className="font-bold text-gray-900 mb-1">
                      Bank Offer
                    </div>
                    <div className="text-gray-600 line-clamp-2 mb-2">
                      Upto ₹1,500.00 discount on select Credit Cards
                    </div>
                    <div className="text-amazon-link hover:underline cursor-pointer text-xs font-medium">
                      1 Offer &gt;
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 my-2"></div>

            {/* Product Details Table */}
            <div className="grid grid-cols-[1fr_2fr] gap-y-2 text-sm my-2">
              <div className="font-bold text-gray-700">Brand</div>
              <div className="text-gray-900">{product.brand}</div>
              <div className="font-bold text-gray-700">Category</div>
              <div className="text-gray-900">{product.category}</div>
              <div className="font-bold text-gray-700">Model Name</div>
              <div className="text-gray-900">
                {product.Title.split(" ").slice(0, 3).join(" ")}
              </div>
            </div>

            <div className="border-t border-gray-200 my-2"></div>

            {/* Description */}
            <div>
              <h3 className="font-bold text-base mb-2">Description</h3>
              <div className="text-sm text-gray-900 whitespace-pre-line">
                {product.description}
              </div>
            </div>
          </div>

          {/* Right Column: Buy Box */}
          <div className="lg:w-[20%]">
            <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-medium text-gray-900 mb-2 flex">
                <span className="text-sm ">₹</span>
                {Math.floor(product.price)}
                <span className="text-sm">
                  {(product.price % 1).toFixed(2).substring(2)}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-2">
                Free delivery{" "}
                <span className="font-bold text-gray-900">6-9 October</span>.
              </div>

              <div className="text-sm text-amazon-link hover:underline cursor-pointer mb-4">
                Details
              </div>

              <Link
                to="/manage-address"
                className="flex items-start gap-2 text-xs text-amazon-link hover:underline cursor-pointer mb-4"
              >
                <MapPin className="w-4 h-4 text-gray-900 mt-0.5" />
                <div>
                  Delivery to {user?.addresses?.[0]?.city || "Select Location"}{" "}
                  - Update Location
                </div>
              </Link>

              <div className="text-lg text-[#B12704] font-medium mb-2">
                Usually ships within 4 to 5 days
              </div>

              <div className="bg-gray-100 border border-gray-300 rounded p-2 mb-4 relative">
                <div className="text-xs font-bold mb-1">
                  International Shipping
                </div>
                <div className="text-xs text-gray-600">
                  Ships from outside the India.
                </div>
                <div className="text-xs text-amazon-link hover:underline cursor-pointer mt-1">
                  Learn more
                </div>
                <div className="absolute -right-2 top-2 w-4 h-4 bg-white transform rotate-45 border-t border-r border-gray-300"></div>
              </div>

              <div className="mb-4">
                <select className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm bg-[#F0F2F2] hover:bg-[#E3E6E6] cursor-pointer focus:ring-1 focus:ring-[#e77600] focus:border-[#e77600] outline-none">
                  <option>Quantity: 1</option>
                  {[...Array(9)].map((_, i) => (
                    <option key={i + 2} value={i + 2}>
                      {i + 2}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 mb-4">
                <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-2 text-sm shadow-sm">
                  Add to Cart
                </button>
                <button className="w-full bg-[#FFA41C] hover:bg-[#FA8900] border border-[#FF8F00] rounded-full py-2 text-sm shadow-sm">
                  Buy Now
                </button>
              </div>

              <div className="text-xs text-gray-600 space-y-2 mb-4">
                <div className="grid grid-cols-[auto_1fr] gap-x-2">
                  <span className="text-gray-500">Ships from</span>
                  <span>Monatik LLC</span>
                  <span className="text-gray-500">Sold by</span>
                  <span className="text-amazon-link hover:underline cursor-pointer">
                    Monatik LLC
                  </span>
                  <span className="text-gray-500">Payment</span>
                  <span className="text-amazon-link hover:underline cursor-pointer">
                    Secure transaction
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button className="w-full border border-gray-300 rounded-md py-1 text-sm hover:bg-gray-50 text-center px-3 shadow-sm">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        {/* Bottom Section: Reviews */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Review Summary */}
          <div className="lg:w-[30%]">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Customer reviews
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-[#FFA41C] text-lg">
                {renderStars(product.rating)}
              </div>
              <span className="text-lg font-medium">
                {product.rating} out of 5
              </span>
            </div>
            <div className="text-sm text-gray-500 mb-6">
              {product.numReviews} global ratings
            </div>

            {/* Star Bars (Dummy) */}
            <div className="space-y-3 mb-8">
              {[5, 4, 3, 2, 1].map((star) => (
                <div
                  key={star}
                  className="flex items-center gap-4 text-sm hover:text-[#C7511F] cursor-pointer group"
                >
                  <span className="w-12 text-amazon-link group-hover:underline">
                    {star} star
                  </span>
                  <div className="flex-1 h-5 bg-gray-100 rounded-sm border border-gray-300 overflow-hidden">
                    <div
                      className="h-full bg-[#FFA41C]"
                      style={{
                        width: star === 5 ? "60%" : star === 4 ? "20%" : "5%",
                      }}
                    ></div>
                  </div>
                  <span className="w-8 text-right text-amazon-link group-hover:underline">
                    {star === 5 ? "60%" : star === 4 ? "20%" : "5%"}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-bold text-lg mb-2">Review this product</h3>
              <p className="text-sm text-gray-900 mb-4">
                Share your thoughts with other customers
              </p>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="w-full border border-gray-300 rounded-lg py-1.5 text-sm hover:bg-gray-50"
              >
                Write a product review
              </button>
            </div>
          </div>

          {/* Right: Reviews List */}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-4">Top reviews from India</h3>
            <div className="space-y-6">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, i) => (
                  <div
                    key={i}
                    className="pb-6 border-b border-gray-200 last:border-0"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
                        {review.user?.name
                          ? review.user.name.charAt(0).toUpperCase()
                          : "U"}
                      </div>
                      <span className="text-sm font-medium">
                        {review.user?.name || "Amazon Customer"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-[#FFA41C] text-sm">
                        {[...Array(5)].map((_, idx) => (
                          <span
                            key={idx}
                            className={
                              idx < review.rating
                                ? "text-[#FFA41C]"
                                : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm font-bold">
                        {review.comment
                          ? review.comment.substring(0, 50) +
                            (review.comment.length > 50 ? "..." : "")
                          : "Review"}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      Reviewed in India on{" "}
                      {new Date(
                        review.createdAt || Date.now()
                      ).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#C7511F] font-medium mb-2">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Purchase
                    </div>
                    <p className="text-sm text-gray-900 mb-4">
                      Important:{" "}
                      <span className="font-medium">{review.title}</span>
                    </p>
                    <div className="text-sm text-gray-500 mb-2">
                      One person found this helpful
                    </div>
                    <div className="flex gap-2">
                      <button className="border border-gray-300 rounded px-4 py-1 text-sm hover:bg-gray-50">
                        Helpful
                      </button>
                      <button className="text-sm text-gray-500 hover:underline">
                        Report
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-sm">
                  No reviews yet. Be the first to review this product!
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
        loading={isSubmittingReview}
      />
    </div>
  );
};

export default ProductDetails;
