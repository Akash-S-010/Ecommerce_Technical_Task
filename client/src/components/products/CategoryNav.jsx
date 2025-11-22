import React from "react";

const CategoryNav = () => {
  const categories = [
    { name: "Amazon Home" },
    { name: "Kitchen & Home Appliances" },
    { name: "Large Appliances" },
    { name: "Kitchen & Dining" },
    { name: "Furniture" },
    { name: "Home Furnishing" },
    { name: "Home Decor" },
    { name: "Home Improvement" },
    { name: "Garden Outdoor" },
    { name: "Storage & Organisation" },
  ];

  return (
    <div className="bg-white border-b border-gray-200 relative">
      <div className="max-w-[1500px] mx-auto px-4">
        <div className="flex items-center gap-6 text-sm overflow-x-auto no-scrollbar">
          {categories.map((category, index) => (
            <div key={index} className="relative py-3">
              <div className="flex items-center gap-1 cursor-pointer whitespace-nowrap hover:text-[#C7511F]">
                <span>{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
