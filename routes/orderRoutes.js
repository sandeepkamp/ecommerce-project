const express = require('express');

const router = express.Router();

const isAuthenticated = require('../middlewares/authMiddleware');

const {
    checkout,
    orderPage
} = require('../controllers/orderController');


router.get(
    '/checkout',
    isAuthenticated,
    checkout
);

router.get(
    '/',
    isAuthenticated,
    orderPage
);

module.exports = router;