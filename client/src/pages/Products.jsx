import React, { useState, useEffect, useMemo } from "react";
import { Filter, X } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CategoryNav from "../components/products/CategoryNav";
import ProductFilters from "../components/products/ProductFilters";
import ProductCard from "../components/products/ProductCard";
import productApi from "../api/productApi";
import toast from "react-hot-toast";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]); // Store all fetched products
  const [filteredProducts, setFilteredProducts] = useState([]); // Store products to display
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile filter toggle

  // Filter State
  const [filters, setFilters] = useState({
    search: "",
    brands: [],
    categories: [],
    priceRange: null,
    rating: null,
  });

  const [sortBy, setSortBy] = useState("featured"); // featured, price-low-high, price-high-low, newest

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter and Sort Logic
  useEffect(() => {
    let result = [...allProducts];

    // 1. Search Filter (Title, Brand, Category)
    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (product) =>
          product.Title.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // 2. Category Filter
    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // 3. Brand Filter
    if (filters.brands.length > 0) {
      result = result.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    // 4. Price Range Filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      result = result.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    // 5. Sorting
    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // Featured (default order or specific logic)
        break;
    }

    setFilteredProducts(result);
  }, [allProducts, filters, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getAllProducts();
      setAllProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Extract unique brands from all products
  const availableBrands = useMemo(() => {
    const brands = allProducts.map((p) => p.brand).filter(Boolean);
    return [...new Set(brands)];
  }, [allProducts]);

  // Extract unique categories from all products
  const availableCategories = useMemo(() => {
    const categories = allProducts.map((p) => p.category).filter(Boolean);
    return [...new Set(categories)];
  }, [allProducts]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <CategoryNav />

      <div className="flex-1 flex max-w-[1500px] mx-auto w-full items-start gap-4 p-2 sm:p-4">
        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="lg:hidden fixed bottom-4 right-4 z-40 bg-[#131921] text-white p-4 rounded-full shadow-lg hover:bg-[#232f3e] transition-colors"
        >
          <Filter className="w-6 h-6" />
        </button>

        {/* Filters Sidebar - Sticky on desktop, slide-in on mobile */}
        <aside
          className={`
            fixed lg:sticky top-0 left-0 h-full lg:h-[calc(100vh-2rem)] 
            w-[280px] sm:w-64 lg:w-64 shrink-0 lg:top-4 
            overflow-y-auto bg-white rounded-none lg:rounded-lg shadow-lg lg:shadow-sm
            z-50 lg:z-auto
            transition-transform duration-300 ease-in-out
            ${
              isFilterOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          {/* Mobile Close Button */}
          <div className="lg:hidden flex justify-between items-center p-4 border-b border-gray-200 bg-[#131921] text-white">
            <h2 className="font-bold text-lg">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-1 hover:bg-[#37475a] rounded"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            availableBrands={availableBrands}
            availableCategories={availableCategories}
          />
        </aside>

        {/* Overlay for mobile */}
        {isFilterOpen && (
          <div
            className="lg:hidden fixed inset-0 backdrop-blur-sm bg-opacity-50 z-40"
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        {/* Products Grid */}
        <main className="flex-1 min-h-[500px]">
          {/* Header & Sort */}
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <p className="text-xs sm:text-sm text-gray-600">
              {filteredProducts.length > 0
                ? `1-${filteredProducts.length} of ${filteredProducts.length} results`
                : "No results found"}
            </p>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 sm:flex-none text-xs sm:text-sm border border-gray-300 rounded p-1.5 sm:p-1 focus:ring-[#e77600] focus:border-[#e77600] outline-none min-h-[44px] sm:min-h-0"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

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
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search term.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    search: "",
                    brands: [],
                    categories: [],
                    priceRange: null,
                    rating: null,
                  })
                }
                className="text-blue-500 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
