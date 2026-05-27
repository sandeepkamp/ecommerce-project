const express = require('express');

const router = express.Router();

const Product = require('../models/Product');

const isAuthenticated = require('../middlewares/authMiddleware');


// ================= HOME PAGE =================
router.get('/', async (req, res) => {

    try {

        const products = await Product.find()
            .populate('category')
            .sort({ createdAt: -1 });

        res.render('pages/home', {
            products
        });

    } catch (error) {

        console.log(error);
    }
});


// ================= ABOUT PAGE =================
router.get('/about', (req, res) => {

    res.render('pages/about');
});


// ================= DASHBOARD =================
router.get('/dashboard', isAuthenticated, (req, res) => {

    res.render('pages/dashboard');
});


// ================= PRODUCT DETAILS =================
router.get('/product/:id', async (req, res) => {

    try {

        const product = await Product.findById(req.params.id)
            .populate('category');

        res.render('pages/product-details', {
            product
        });

    } catch (error) {

        console.log(error);
    }
});


module.exports = router;