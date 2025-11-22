import React from "react";
import Header from "../components/layout/Header";
import HeroSlider from "../components/home/HeroSlider";
import CategoryCard, {
  homeCardData,
  scrollData,
} from "../components/home/CategoryCard";
import ProductScroll from "../components/home/ProductScroll";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <div className="bg-[#eaeded] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-[1500px] mx-auto w-full relative pb-5">
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

        {/* Product Scroll Sections */}
        <ProductScroll
          title="Related to items you've viewed"
          products={scrollData.Clothes  }
        />

        <ProductScroll title="More items to consider" products={scrollData.Vehicles} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
