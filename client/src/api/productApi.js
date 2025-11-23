import axiosInstance from '../config/axios.js';

const productApi = {
    // Get all products
    getAllProducts: async () => {
        const response = await axiosInstance.get('/products');
        return response.data;
    },

    // Get product by ID
    getProductById: async (id) => {
        const response = await axiosInstance.get(`/products/${id}`);
        return response.data;
    },

    // Create a new product
    createProduct: async (productData) => {
        const response = await axiosInstance.post('/products', productData);
        return response.data;
    },

    // Add product review
    addProductReview: async (productId, reviewData) => {
        const response = await axiosInstance.post(`/products/${productId}/reviews`, reviewData);
        return response.data;
    },
};

export default productApi;
