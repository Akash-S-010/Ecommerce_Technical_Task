import { create } from 'zustand';
import cartApi from '../api/cartApi';
import toast from 'react-hot-toast';

const useCartStore = create((set, get) => ({
    cart: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
    },
    isLoading: false,
    error: null,

    fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await cartApi.getCart();
            set({ cart: data, isLoading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to fetch cart',
                isLoading: false
            });
        }
    },

    addToCart: async (productId, quantity = 1) => {
        set({ isLoading: true, error: null });
        try {
            const data = await cartApi.addToCart(productId, quantity);
            set({ cart: data, isLoading: false });
            toast.success('Added to cart');
            return true;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to add to cart';
            set({
                error: errorMessage,
                isLoading: false
            });
            toast.error(errorMessage);
            return false;
        }
    },

    updateQuantity: async (productId, quantity) => {
        set({ isLoading: true, error: null });
        try {
            const data = await cartApi.updateCartItem(productId, quantity);
            set({ cart: data, isLoading: false });
            toast.success('Cart updated');
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to update cart',
                isLoading: false
            });
            toast.error('Failed to update quantity');
        }
    },

    removeFromCart: async (productId) => {
        set({ isLoading: true, error: null });
        try {
            const data = await cartApi.removeFromCart(productId);
            set({ cart: data, isLoading: false });
            toast.success('Item removed from cart');
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to remove item',
                isLoading: false
            });
            toast.error('Failed to remove item');
        }
    },
}));

export default useCartStore;
