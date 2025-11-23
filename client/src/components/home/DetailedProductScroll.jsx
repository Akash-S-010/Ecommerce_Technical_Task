import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const DetailedProductScroll = ({
  title,
  linkText = "See more",
  products = [],
}) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      if (direction === "left") {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="bg-white p-5 mb-5 relative z-30 mx-5">
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-xl font-bold text-[#0F1111]">{title}</h2>
        {linkText && (
          <Link
            to="#"
            className="text-sm text-amazon-link hover:text-[#C7511F] hover:underline"
          >
            {linkText}
          </Link>
        )}
      </div>

      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-300 h-[100px] w-12 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity rounded-r-md"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 scroll-smooth no-scrollbar pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product, index) => (
            <div
              key={index}
              className="min-w-[220px] max-w-[220px] flex flex-col cursor-pointer"
            >
              {/* Image */}
              <div className="h-[200px] flex items-center justify-center mb-2 p-2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col gap-1">
                <Link
                  to="/products"
                  className="text-amazon-link hover:text-[#C7511F] hover:underline text-sm font-medium leading-snug line-clamp-2"
                >
                  {product.title}
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex text-[#F4A41C]">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <Star className="w-4 h-4 fill-current text-[#F4A41C] opacity-50" />
                  </div>
                  <span className="text-amazon-link text-xs hover:text-[#C7511F] hover:underline cursor-pointer">
                    {product.reviews}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xs align-top">₹</span>
                  <span className="text-xl font-medium">{product.price}</span>
                  <span className="text-xs text-gray-500 line-through">
                    M.R.P: ₹{product.mrp}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({product.discount})
                  </span>
                </div>

                {/* Deal Badge (Optional) */}
                {product.discount && (
                  <div className="bg-[#CC0C39] text-white text-xs font-bold px-1.5 py-0.5 w-fit rounded-sm">
                    {product.discount} Limited time deal
                  </div>
                )}

                {/* Delivery */}
                <div className="text-xs text-gray-500 mt-1">
                  Get it by{" "}
                  <span className="font-bold text-gray-700">
                    Monday, November 25
                  </span>
                </div>
                <div className="text-xs text-gray-500">{product.delivery}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-300 h-[100px] w-12 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity rounded-l-md"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default DetailedProductScroll;
