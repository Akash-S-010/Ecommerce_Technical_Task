import { create } from 'zustand';
import authApi from '../api/authApi.js';


const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  tempEmail: null, // Store email temporarily for OTP verification

  // Signup User
  signup: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.signup(userData);
      set({ 
        isLoading: false, 
        tempEmail: userData.email // Store email for OTP verification
      });
      return { success: true, message: response.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed';
      set({ isLoading: false, error: errorMessage });
      return { success: false, message: errorMessage };
    }
  },

//   verify otp
  verifyOtp: async (otpData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.verifyOtp(otpData);
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        tempEmail: null,
      });
      return { success: true, message: response.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'OTP verification failed';
      set({ isLoading: false, error: errorMessage });
      return { success: false, message: errorMessage };
    }
  },


//   Login user
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(credentials);
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return { success: true, message: response.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({ isLoading: false, error: errorMessage });
      return { success: false, message: errorMessage };
    }
  },

  
//   USer profile update
  updateProfile: async (profileData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.updateProfile(profileData);
      set({
        user: response.user,
        isLoading: false,
      });
      return { success: true, message: response.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      set({ isLoading: false, error: errorMessage });
      return { success: false, message: errorMessage };
    }
  },



//   Check if user is authenticated
  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await authApi.checkAuth();
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      return { success: true };
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      return { success: false };
    }
  },

  
//   Logout user
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await authApi.logout();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        tempEmail: null,
      });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false };
    }
  },

// clear erors
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
