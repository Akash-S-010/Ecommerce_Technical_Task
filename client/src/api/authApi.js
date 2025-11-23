import axiosInstance from '../config/axios.js';

// Auth API service using existing axios configuration
const authApi = {
    // Sign up a new user
    signup: async (userData) => {
        const response = await axiosInstance.post('/auth/signup', userData);
        return response.data;
    },

    // Verify OTP for email verification
    verifyOtp: async (otpData) => {
        const response = await axiosInstance.post('/auth/verify-otp', otpData);
        return response.data;
    },

    // Login user with email and password
    login: async (credentials) => {
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data;
    },

    // Update user profile (business profile)
    updateProfile: async (profileData) => {
        const response = await axiosInstance.put('/auth/profile', profileData);
        return response.data;
    },

    // Check if user is authenticated
    checkAuth: async () => {
        const response = await axiosInstance.get('/auth/me');
        return response.data;
    },

    // Logout user
    logout: async () => {
        const response = await axiosInstance.post('/auth/logout');
        return response.data;
    },

    // Google OAuth authentication
    googleAuth: async (credential) => {
        const response = await axiosInstance.post('/auth/google', { credential });
        return response.data;
    },
};

export default authApi;
