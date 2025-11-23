import React, { useState } from "react";

const ProductImageGallery = ({ images, productTitle }) => {
  const [selectedImage, setSelectedImage] = useState(images?.[0] || "");

  return (
    <div className="w-full lg:w-[40%] flex flex-col lg:flex-row gap-3 lg:gap-4 lg:sticky lg:top-4 lg:self-start">
      {/* Main Image */}
      <div className="order-1 lg:order-2 flex-1 flex items-center justify-center border border-gray-100 bg-white min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
        <img
          src={selectedImage || "https://via.placeholder.com/500"}
          alt={productTitle}
          className="max-w-full max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-contain p-4"
        />
      </div>

      {/* Thumbnails - Horizontal on mobile, Vertical on desktop */}
      <div className="order-2 lg:order-1 flex lg:flex-col gap-2 lg:gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
        {images &&
          images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(img)}
              onMouseEnter={() => setSelectedImage(img)}
              className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-10 lg:h-10 shrink-0 border rounded cursor-pointer p-1 flex items-center justify-center ${
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
    </div>
  );
};

export default ProductImageGallery;
