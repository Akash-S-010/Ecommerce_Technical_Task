import Cart from '../models/Cart.js';
import { Product } from '../models/Product.js';

// -----Get current user's cart
export const getCart = async (req, res) => {
  try {
    const { userId } = req.user;

    let cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return res.status(200).json({
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });
    }

    let totalItems = 0;
    let totalPrice = 0;

    cart.items.forEach((item) => {
      totalItems += item.quantity;
      if (item.product && typeof item.product.price === 'number') {
        totalPrice += item.product.price * item.quantity;
      }
    });

    res.status(200).json({
      items: cart.items,
      totalItems,
      totalPrice,
    });
  } catch (error) {
    console.error('Get cart error:', error);
    return res.status(500).json({ message: 'Server error while fetching cart' });
  }
};


// -----Add item to cart (or increase quantity)
export const addToCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'productId is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const qtyToAdd = quantity && quantity > 0 ? quantity : 1;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += qtyToAdd;
    } else {
      cart.items.push({
        product: productId,
        quantity: qtyToAdd,
        addedAt: new Date(),
      });
    }

    await cart.save();
    await cart.populate('items.product');

    let totalItems = 0;
    let totalPrice = 0;

    cart.items.forEach((item) => {
      totalItems += item.quantity;
      if (item.product && typeof item.product.price === 'number') {
        totalPrice += item.product.price * item.quantity;
      }
    });

    res.status(200).json({
      message: 'Cart updated successfully',
      items: cart.items,
      totalItems,
      totalPrice,
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    return res.status(500).json({ message: 'Server error while updating cart' });
  }
};


// -----Update cart item quantity
export const updateCartItemQuantity = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'productId is required' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    const newQuantity = Number(quantity);

    if (!newQuantity || newQuantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = newQuantity;
    }

    await cart.save();
    await cart.populate('items.product');

    let totalItems = 0;
    let totalPrice = 0;

    cart.items.forEach((item) => {
      totalItems += item.quantity;
      if (item.product && typeof item.product.price === 'number') {
        totalPrice += item.product.price * item.quantity;
      }
    });

    res.status(200).json({
      message: 'Cart item updated successfully',
      items: cart.items,
      totalItems,
      totalPrice,
    });
  } catch (error) {
    console.error('Update cart item quantity error:', error);
    return res.status(500).json({ message: 'Server error while updating cart item' });
  }
};


// -----Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: 'productId is required' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    await cart.save();
    await cart.populate('items.product');

    let totalItems = 0;
    let totalPrice = 0;

    cart.items.forEach((item) => {
      totalItems += item.quantity;
      if (item.product && typeof item.product.price === 'number') {
        totalPrice += item.product.price * item.quantity;
      }
    });

    res.status(200).json({
      message: 'Item removed from cart',
      items: cart.items,
      totalItems,
      totalPrice,
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    return res.status(500).json({ message: 'Server error while removing item from cart' });
  }
};
