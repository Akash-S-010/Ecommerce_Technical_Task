import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const CategoryNav = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const categories = [
    { name: "Amazon Home", hasDropdown: false },
    {
      name: "Kitchen & Home Appliances",
      hasDropdown: true,
      dropdown: {
        sections: [
          {
            title: "Kitchen Appliances",
            items: [
              "Mixer Grinders",
              "Juicers",
              "Hand Blenders",
              "Food Processors",
              "Oven Toaster Grills",
              "Toaster",
              "Rice & Pasta Cookers",
              "Deep Fryers",
              "Hand Mixers",
              "Coffee Machines",
              "Wet Grinders",
              "Induction Cooktops",
              "Sandwich Makers",
              "Electric Kettles",
            ],
          },
          {
            title: "Home Appliances",
            items: [
              "Water Purifiers",
              "Irons",
              "Sewing Machines & Accessories",
              "Vacuum Cleaners",
              "Inverters",
            ],
          },
          {
            title: "Heating, Cooling & Air Quality",
            items: [
              "Fans",
              "Water Heaters",
              "Air Coolers",
              "Air Purifiers",
              "Dehumidifiers",
              "Humidifiers",
            ],
          },
          {
            title: "Shop By Brand",
            items: [
              "Philips",
              "Bajaj",
              "Prestige",
              "Eureka Forbes",
              "Kent",
              "Opat",
              "Symphony",
              "Preethi",
              "Usha",
              "Hai Premit",
              "Morphy Richards",
              "Crompton",
              "Wonderchef",
              "Pigeon",
            ],
          },
        ],
      },
    },
    {
      name: "Large Appliances",
      hasDropdown: true,
      dropdown: {
        sections: [
          {
            title: "Air Conditioners",
            items: ["Split ACs", "Window ACs", "Inverter ACs"],
          },
          {
            title: "Refrigerators",
            items: [
              "Single Door",
              "Double Door",
              "Triple Door",
              "Side-By-Side",
            ],
          },
          {
            title: "Washing Machines",
            items: [
              "Fully Automatic Front Load",
              "Fully Automatic Top Load",
              "Semi Automatic Top Load",
              "Dryers",
            ],
          },
          {
            title: "Shop by brand",
            items: ["LG", "Voltas", "Carrier", "Blue Star", "BPL", "Samsung"],
          },
          {
            title: "Microwave Ovens",
            items: ["Solo", "Convection", "Grill"],
          },
          {
            title: "Dishwashers",
            items: [],
          },
          {
            title: "Chimneys",
            items: [],
          },
        ],
      },
    },
    { name: "Kitchen & Dining", hasDropdown: false },
    { name: "Furniture", hasDropdown: false },
    { name: "Home Furnishing", hasDropdown: false },
    { name: "Home Decor", hasDropdown: false },
    { name: "Home Improvement", hasDropdown: false },
    { name: "Garden Outdoor", hasDropdown: false },
    { name: "Storage & Organisation", hasDropdown: false },
  ];

  return (
    <div className="bg-white border-b border-gray-200 relative">
      <div className="max-w-[1500px] mx-auto px-4">
        <div className="flex items-center gap-6 text-sm overflow-x-auto no-scrollbar">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative py-3"
              onMouseEnter={() =>
                category.hasDropdown && setActiveDropdown(category.name)
              }
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="flex items-center gap-1 cursor-pointer whitespace-nowrap hover:text-[#C7511F]">
                <span>{category.name}</span>
                {category.hasDropdown && <ChevronDown className="w-3 h-3" />}
              </div>

              {/* Dropdown */}
              {category.hasDropdown && activeDropdown === category.name && (
                <div className="absolute left-0 top-full mt-0 bg-white border border-gray-200 shadow-lg z-50 min-w-[900px] p-6">
                  <div className="grid grid-cols-4 gap-8">
                    {category.dropdown.sections.map((section, sIdx) => (
                      <div key={sIdx}>
                        <h3 className="font-bold text-sm mb-3">
                          {section.title}
                        </h3>
                        <ul className="space-y-2">
                          {section.items.map((item, iIdx) => (
                            <li key={iIdx}>
                              <a
                                href="#"
                                className="text-sm text-gray-700 hover:text-[#C7511F] hover:underline"
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
