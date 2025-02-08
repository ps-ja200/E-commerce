// controllers/checkoutController.js
const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
    try {
        const { shippingName, shippingEmail, shippingAddress } = req.body;
        const userId = req.session.userId;
        const cart = await Cart.findOne({ userId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const order = new Order({
            userId,
            shippingName,
            shippingEmail,
            shippingAddress,
            items: cart.items
        });

        await order.save();
        await Cart.findOneAndRemove({ userId });

        res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error });
    }
};