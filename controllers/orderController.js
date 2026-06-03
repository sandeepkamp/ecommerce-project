const Cart = require('../models/Cart');
const Order = require('../models/Order');


// Checkout
const checkout = async (req, res) => {

    try {

        const userId = req.session.user.id;

        const cartItems = await Cart.find({
            user: userId
        }).populate('product');

        if (cartItems.length === 0) {

            req.flash('error_msg', 'Cart is empty');

            return res.redirect('/cart');
        }

        let totalAmount = 0;

        const orderItems = [];

        cartItems.forEach(item => {

            totalAmount += item.product.price * item.quantity;

            orderItems.push({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            });

        });

        await Order.create({
            user: userId,
            items: orderItems,
            totalAmount
        });

        // Empty cart
        await Cart.deleteMany({
            user: userId
        });

        req.flash('success_msg', 'Order placed successfully');

        res.redirect('/orders');

    } catch (error) {

        console.log(error);

        res.redirect('/cart');
    }
};


// User Orders
const orderPage = async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.session.user.id
        })
        .populate('items.product')
        .sort({ createdAt: -1 });

        res.render('orders/index', {
            orders
        });

    } catch (error) {

        console.log(error);
    }
};


module.exports = {
    checkout,
    orderPage
};