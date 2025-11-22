import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CategoryNav from "../components/products/CategoryNav";
import productApi from "../api/productApi";
import ReviewModal from "../components/products/ReviewModal";
import toast from "react-hot-toast";
import useAuthStore from "../store/useAuthStore";
import ProductImageGallery from "../components/detailspage/ProductImageGallery";
import ProductInfo from "../components/detailspage/ProductInfo";
import ProductBuyBox from "../components/detailspage/ProductBuyBox";
import ProductReviews from "../components/detailspage/ProductReviews";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productApi.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleReviewSubmit = async (reviewData) => {
    try {
      setIsSubmittingReview(true);
      const response = await productApi.addProductReview(id, reviewData);
      setProduct(response.product); // Update product with new review
      setIsReviewModalOpen(false);
      toast.success("Review submitted successfully");
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f08804]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CategoryNav />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-600 text-lg">{error || "Product not found"}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <CategoryNav />

      {/* Breadcrumb (Dummy) */}
      <main className="max-w-[1500px] mx-auto p-4 flex-1 w-full pt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <ProductImageGallery
            images={product.images}
            productTitle={product.Title}
          />
          <ProductInfo product={product} />
          <ProductBuyBox product={product} user={user} />
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        <ProductReviews
          product={product}
          onWriteReview={() => setIsReviewModalOpen(true)}
        />
      </main>
      <Footer />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
        loading={isSubmittingReview}
      />
    </div>
  );
};

export default ProductDetails;
