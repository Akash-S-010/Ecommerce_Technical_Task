import React from "react";
import Header from "../components/layout/Header";
import HeroSlider from "../components/home/HeroSlider";
import CategoryCard, { homeCardData } from "../components/home/CategoryCard";

const Home = () => {
  return (
    <div className="bg-[#eaeded] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-[1500px] mx-auto w-full relative">
        <HeroSlider />

        {/* Category Cards Grid - Overlapping the slider */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-5 -mt-20 md:-mt-40 lg:-mt-60 relative z-10 mb-10">
          {homeCardData.map((card, index) => (
            <CategoryCard
              key={index}
              title={card.title}
              type={card.type}
              items={card.items}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
