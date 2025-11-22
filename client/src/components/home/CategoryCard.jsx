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

export default CategoryCard;
