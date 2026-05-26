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


module.exports = router;