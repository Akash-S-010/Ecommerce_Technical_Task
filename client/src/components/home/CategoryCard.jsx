import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({
  title,
  items,
  linkText = "See more",
  linkTo = "#",
  type = "grid",
}) => {
  return (
    <div className="bg-white p-5 z-30 h-[420px] flex flex-col overflow-hidden">
      <h2 className="text-xl font-bold mb-4 leading-tight">{title}</h2>

      {type === "grid" ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 flex-1 mb-2">
          {items.map((item, index) => (
            <Link key={index} to={item.link || "#"} className="flex flex-col">
              <div className="h-[110px] overflow-hidden mb-1">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-contain object-top"
                />
              </div>
              <span className="text-xs text-gray-800 leading-tight line-clamp-2">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <Link to={linkTo} className="flex-1 flex flex-col mb-2">
          <div className="flex-1 overflow-hidden mb-2">
            <img
              src={items[0].image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      )}

      <Link
        to={linkTo}
        className="text-xs text-blue-700 hover:text-red-700 hover:underline block mt-auto"
      >
        {linkText}
      </Link>
    </div>
  );
};

export const homeCardData = [
  {
    title: "Revamp your home in style",
    type: "grid",
    items: [
      {
        label: "Cushion covers, bedsheets & more",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/186x116_Home_furnishing_2._SY116_CB584596691_.jpg",
      },
      {
        label: "Figurines, vases & more",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/186x116_Home_decor_1._SY116_CB584596691_.jpg",
      },
      {
        label: "Home storage",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/186x116_Home_storage_1._SY116_CB584596691_.jpg",
      },
      {
        label: "Lighting solutions",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/186x116_Lighting_2._SY116_CB584596691_.jpg",
      },
    ],
  },
  {
    title: "Appliances for your home | Up to 55% off",
    type: "grid",
    items: [
      {
        label: "Air Conditioners",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08RDL6H79._SY116_CB667322346_.jpg",
      },
      {
        label: "Refrigerators",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08345R1ZW._SY116_CB667322346_.jpg",
      },
      {
        label: "Microwaves",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B07G5J591B._SY116_CB667322346_.jpg",
      },
      {
        label: "Washing machines",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/186x116---wm._SY116_CB667322346_.jpg",
      },
    ],
  },
  {
    title: "Starting $149 | Headphones",
    type: "grid",
    items: [
      {
        label: "Starting $249 | boAt",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/GW/QC/PC/PC_QuadCard_BoAt_0.5x._SY116_CB667159060_.jpg",
      },
      {
        label: "Starting $349 | boult",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/GW/QC/PC/PC_QuadCard_Boult_0.5x._SY116_CB667159060_.jpg",
      },
      {
        label: "Starting $649 | Noise",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/GW/QC/PC/PC_QuadCard_Noise_0.5x._SY116_CB667159060_.jpg",
      },
      {
        label: "Starting $149 | Zebronics",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/GW/QC/PC/PC_QuadCard_Zeb_0.5x._SY116_CB667159060_.jpg",
      },
    ],
  },
  {
    title: "Starting $99 | Amazon Brands & more",
    type: "grid",
    items: [
      {
        label: "Starting $299 | Home storage",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Symbol/2024/GW_Feb/Desktop/QC/1_1x._SY116_CB582668236_.jpg",
      },
      {
        label: "Up to 60% off | Storage & racks",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Symbol/2024/GW_Feb/Desktop/QC/2_1x._SY116_CB582668236_.jpg",
      },
      {
        label: "Starting $99 | Toys & games",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Symbol/2024/GW_Feb/Desktop/QC/3_1x._SY116_CB582668236_.jpg",
      },
      {
        label: "Up to 60% off | Jackets",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Symbol/2024/GW_Feb/Desktop/QC/4_1x._SY116_CB582668236_.jpg",
      },
    ],
  },
];

export default CategoryCard;
