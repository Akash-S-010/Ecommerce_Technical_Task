import React from "react";
import { ShieldCheck } from "lucide-react";

const ProductReviews = ({ product, onWriteReview }) => {
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

  return (
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
          <span className="text-lg font-medium">{product.rating} out of 5</span>
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
            onClick={onWriteReview}
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
                  Important: <span className="font-medium">{review.title}</span>
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
  );
};

export default ProductReviews;
