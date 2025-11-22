import React from "react";

const ProductInfo = ({ product }) => {
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

  // Calculate discount
  const originalPrice = Math.round(product.price * 1.3);
  const discountPercent = Math.round(
    ((originalPrice - product.price) / originalPrice) * 100
  );

  return (
    <div className="lg:w-[40%] flex flex-col gap-2">
      <h1 className="text-2xl font-medium text-gray-900 leading-tight">
        {product.Title}
      </h1>

      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center">{renderStars(product.rating)}</div>
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
          <span className="line-through">₹{formatPrice(originalPrice)}</span>
        </div>
        <div className="text-sm text-gray-900">Inclusive of all taxes</div>
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
              <div className="font-bold text-gray-900 mb-1">Bank Offer</div>
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
  );
};

export default ProductInfo;
