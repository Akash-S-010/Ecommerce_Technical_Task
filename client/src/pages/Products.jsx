import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CategoryNav from "../components/products/CategoryNav";
import ProductFilters from "../components/products/ProductFilters";
import ProductCard from "../components/products/ProductCard";
import productApi from "../api/productApi";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <CategoryNav />

      <div className="flex-1 flex max-w-[1500px] mx-auto w-full items-start gap-4 p-4">
        {/* Filters Sidebar - Sticky */}
        <aside className="w-64 shrink-0 sticky top-0 pb-4">
          <ProductFilters />
        </aside>

        {/* Products Grid */}
        <main className="flex-1 min-h-[500px]">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f08804]"></div>
            </div>
          ) : error ? (
            <div className="bg-white p-8 text-center rounded-lg">
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchProducts}
                className="mt-4 bg-[#FFD814] hover:bg-[#F7CA00] px-6 py-2 rounded-lg"
              >
                Retry
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white p-8 text-center rounded-lg">
              <p className="text-gray-600">No products found</p>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  1-{products.length} of {products.length} results
                </p>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
