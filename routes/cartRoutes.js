const express = require('express');

const router = express.Router();

const isAuthenticated = require('../middlewares/authMiddleware');

const {
    cartPage,
    addToCart
} = require('../controllers/cartController');

router.get(
    '/',
    isAuthenticated,
    cartPage
);

router.get(
    '/add/:id',
    isAuthenticated,
    addToCart
);

module.exports = router;