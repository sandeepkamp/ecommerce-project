const Cart = require('../models/cart');
const Product = require('../models/product');

// ================= CART PAGE =================
const cartPage = async (req, res) => {
    try {
        const cartItems = await Cart.find({ user: req.session.user.id })
            .populate('product')
            .sort({ createdAt: -1 });

        const total = cartItems.reduce((sum, item) => {
            const price = item.product ? item.product.price : 0;
            return sum + price * item.quantity;
        }, 0);

        res.render('cart/index', {
            cartItems,
            total
        });
    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Unable to load cart');
        res.redirect('/products');
    }
};

// ================= ADD TO CART =================
const addToCart = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if (!product) {
            req.flash('error_msg', 'Product not found');
            return res.redirect('/products');
        }

        const cartItem = await Cart.findOne({
            user: req.session.user.id,
            product: productId
        });

        if (cartItem) {
            cartItem.quantity += 1;
            await cartItem.save();
        } else {
            await Cart.create({
                user: req.session.user.id,
                product: productId,
                quantity: 1
            });
        }

        req.flash('success_msg', 'Product added to cart');
        res.redirect('/cart');
    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Unable to add product to cart');
        res.redirect('/products');
    }
};

module.exports = {
    cartPage,
    addToCart
};