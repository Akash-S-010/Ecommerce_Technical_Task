import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProductScroll = ({ title, linkText = "See more", products = [] }) => {
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
            to="/products"
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
          onClick={() => navigate("/products")}
        >
          {products.map((product, index) => (
            <Link
              key={index}
              to="/products"
              className="min-w-[200px] max-w-[200px] flex flex-col cursor-pointer"
            >
              <div className="bg-gray-100 h-[200px] flex items-center justify-center mb-2 p-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                />
              </div>
            </Link>
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

export default ProductScroll;
