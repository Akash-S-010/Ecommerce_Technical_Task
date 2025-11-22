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
          "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/1x/final/186x116_Home_furnishings_2._SY116_CB555624324_.jpg96691_.jpg",
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
          "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/1x/final/186x116_Home_lighting_2._SY116_CB555624324_.jpg96691_.jpg",
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
          "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B07G5J5FYP._SY116_CB667322346_.jpg22346_.jpg",
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
          "https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/GW/QC/PC/PC_QuadCard_boAt_0.5x._SY116_CB553870684_.jpg59060_.jpg",
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
    title: "Automotive essentials | Up to 60% off",
    type: "grid",
    items: [
      {
        label: "Cleaning accesories",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/2020/GW/PCQC/Glasscare1X._SY116_CB410830553_.jpg68236_.jpg",
      },
      {
        label: "Tyre care",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/2020/GW/PCQC/Rim_tyrecare1x._SY116_CB410830552_.jpg68236_.jpg",
      },
      {
        label: "Helmet",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/2020/GW/PCQC/Vega_helmet_186x116._SY116_CB405090404_.jpg",
      },
      {
        label: "Vacuum cleaner",
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/2020/GW/PCQC/Vaccum1x._SY116_CB410830552_.jpg",
      },
    ],
  },
];

export const scrollData = [
  {
    image: "https://m.media-amazon.com/images/I/71cflgAolqL._AC_SY400_.jpg",
    name: "Dress 1",
  },
  {
    image: "https://m.media-amazon.com/images/I/71cflgAolqL._AC_SY400_.jpg",
    name: "Dress 2",
  },
  {
    image: "https://m.media-amazon.com/images/I/71cflgAolqL._AC_SY400_.jpg",
    name: "Dress 3",
  },
  {
    image: "https://m.media-amazon.com/images/I/71cflgAolqL._AC_SY400_.jpg",
    name: "Dress 4",
  },
  {
    image: "https://m.media-amazon.com/images/I/71cflgAolqL._AC_SY400_.jpg",
    name: "Dress 5",
  },
  {
    image: "https://m.media-amazon.com/images/I/71cflgAolqL._AC_SY400_.jpg",
    name: "Dress 6",
  },
  {
    image: "https://m.media-amazon.com/images/I/71cflgAolqL._AC_SY400_.jpg",
    name: "Dress 7",
  },
  {
    image: "https://m.media-amazon.com/images/I/71cflgAolqL._AC_SY400_.jpg",
    name: "Dress 8",
  },
  {
    image: "https://m.media-amazon.com/images/I/71cflgAolqL._AC_SY400_.jpg",
    name: "Dress 9",
  },
  {
    image: "https://m.media-amazon.com/images/I/71cflgAolqL._AC_SY400_.jpg",
    name: "Dress 10",
  },
];

export default CategoryCard;
