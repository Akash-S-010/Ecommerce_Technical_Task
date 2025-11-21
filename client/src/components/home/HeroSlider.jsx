import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Placeholder images simulating Amazon's hero banners
  const slides = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Media/Books/BX/Rev/D330834006_PC_2._CB797799253_.jpgq=80", 
    "https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/af_pc_2x._CB792409181_.jpgq=80", 
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Beauty/GW/yesbank/makeup_PC._CB796616147_.pngq=80", 
    "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Consumables/Baby2025/Nov25/SVD/Heros/XGL/SVD_PC_Hero_02._CB778865641_.jpgq=80", 
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full z-0">
      <div className="relative h-[250px] md:h-[350px] lg:h-[600px] overflow-hidden">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full h-full relative">
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover object-top"
              />
              {/* Gradient Overlay at Bottom */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-[#eaeded] to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/4 left-4 transform -translate-y-1/2 p-2 h-60 hover:border hover:border-white focus:outline-none"
        >
          <ChevronLeft size={40} className="text-gray-800" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/4 right-4 transform -translate-y-1/2 p-2 h-60 hover:border hover:border-white focus:outline-none"
        >
          <ChevronRight size={40} className="text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
