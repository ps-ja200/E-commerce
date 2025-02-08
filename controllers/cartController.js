// controllers/cartController.js
const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.session.userId; // Assuming you store userId in session after login

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
};

exports.getCart = async (req, res) => {
    try {
        const userId = req.session.userId;
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.session.userId;
        const productId = req.params.productId;

        const cart = await Cart.findOne({ userId });
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        await cart.save();
        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart', error });
    }
};

exports.updateQuantity = async (req, res) => {
    try {
        const userId = req.session.userId;
        const productId = req.params.productId;
        const quantity = req.body.quantity;

        const cart = await Cart.findOne({ userId });
        const item = cart.items.find(item => item.productId.toString() === productId);

        if (item) {
            item.quantity = quantity;
            await cart.save();
            res.status(200).json({ message: 'Quantity updated', cart });
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating quantity', error });
    }
};

// Clear cart functionality
exports.clearCart = async (req, res) => {
    const userId = req.session.userId;
    await Cart.findOneAndDelete({ userId });
    res.status(200).json({ message: 'Cart cleared' });
  };