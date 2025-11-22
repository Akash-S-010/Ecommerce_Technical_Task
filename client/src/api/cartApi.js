import axios from '../config/axios.js';

const cartApi = {
    getCart: async () => {
        const response = await axios.get('/cart');
        return response.data;
    },

    addToCart: async (productId, quantity) => {
        const response = await axios.post('/cart/add', { productId, quantity });
        return response.data;
    },

    updateCartItem: async (productId, quantity) => {
        const response = await axios.put(`/cart/item/${productId}`, { quantity });
        return response.data;
    },

    removeFromCart: async (productId) => {
        const response = await axios.delete(`/cart/item/${productId}`);
        return response.data;
    },
};

export default cartApi;
