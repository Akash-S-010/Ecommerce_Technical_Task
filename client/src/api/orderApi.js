import axios from '../config/axios.js';

const orderApi = {
    placeOrder: async (orderData) => {
        const response = await axios.post('/orders', orderData);
        return response.data;
    },

    getMyOrders: async () => {
        const response = await axios.get('/orders/my');
        return response.data;
    },

    getOrderById: async (id) => {
        const response = await axios.get(`/orders/${id}`);
        return response.data;
    },

    updatePaymentStatus: async (id, paymentStatus) => {
        const response = await axios.patch(`/orders/${id}/payment`, { paymentStatus });
        return response.data;
    },

    getRazorpayKey: async () => {
        const response = await axios.get('/payment/key');
        return response;
    }
};

export default orderApi;
