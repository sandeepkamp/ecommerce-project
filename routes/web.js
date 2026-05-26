const isAuthenticated = require('../middlewares/authMiddleware');

const express = require('express');

const router = express.Router();


// Home Page
router.get('/', (req, res) => {

    res.render('pages/home');
});


// About Page
router.get('/about', (req, res) => {

    res.render('pages/about');
});

// Dashboard
router.get('/dashboard', isAuthenticated, (req, res) => {

    res.render('pages/dashboard');
});

module.exports = router;