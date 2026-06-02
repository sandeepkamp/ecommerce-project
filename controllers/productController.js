const Product = require('../models/product');

const Category = require('../models/category');


// ================= PRODUCT PAGE =================
const productPage = async (req, res) => {

    try {

        const products = await Product.find()
            .populate('category')
            .sort({ createdAt: -1 });

        const categories = await Category.find();

        res.render('products/index', {
            products,
            categories
        });

    } catch (error) {

        console.log(error);
    }
};


// ================= ADD PRODUCT =================
const addProduct = async (req, res) => {

    try {

        const {
            name,
            price,
            description,
            category
        } = req.body;

        await Product.create({

            name,

            price,

            description,

            category,

            image: req.file ? req.file.filename : ''

        });

        req.flash('success_msg', 'Product added successfully');

        res.redirect('/products');

    } catch (error) {

        console.log(error);

        res.redirect('/products');
    }
};


// ================= DELETE PRODUCT =================
const deleteProduct = async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id);

        req.flash('success_msg', 'Product deleted successfully');

        res.redirect('/products');

    } catch (error) {

        console.log(error);

        res.redirect('/products');
    }
};


module.exports = {
    productPage,
    addProduct,
    deleteProduct
};