import axiosInstance from '../config/axios.js';

const addressApi = {
    // Add a new address
    addAddress: async (addressData) => {
        const response = await axiosInstance.post('/address/add', addressData);
        return response.data;
    },

    // Get all addresses
    getAddresses: async () => {
        const response = await axiosInstance.get('/address/list');
        return response.data;
    },

    // Update an address
    updateAddress: async (addressId, addressData) => {
        const response = await axiosInstance.put(`/address/${addressId}`, addressData);
        return response.data;
    },

    // Delete an address
    deleteAddress: async (addressId) => {
        const response = await axiosInstance.delete(`/address/${addressId}`);
        return response.data;
    },
};

export default addressApi;
