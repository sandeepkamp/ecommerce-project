const express = require('express');

const router = express.Router();

const isAuthenticated = require('../middlewares/authMiddleware');

const upload = require('../middlewares/uploadMiddleware');

const {
    productPage,
    addProduct,
    deleteProduct
} = require('../controllers/productController');


// Product Page
router.get('/', isAuthenticated, productPage);


// Add Product
router.post(
    '/add',
    isAuthenticated,
    upload.single('image'),
    addProduct
);


// Delete Product
router.get('/delete/:id', isAuthenticated, deleteProduct);


module.exports = router;