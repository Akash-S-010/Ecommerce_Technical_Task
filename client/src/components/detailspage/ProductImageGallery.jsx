import React, { useState } from "react";

const ProductImageGallery = ({ images, productTitle }) => {
  const [selectedImage, setSelectedImage] = useState(images?.[0] || "");

  return (
    <div className="lg:w-[40%] flex gap-4 sticky top-4 self-start">
      {/* Thumbnails */}
      <div className="flex flex-col gap-3">
        {images &&
          images.map((img, idx) => (
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
          alt={productTitle}
          className="max-w-full max-h-[500px] object-contain"
        />
      </div>
    </div>
  );
};

export default ProductImageGallery;
