const express = require('express');

const router = express.Router();

const {
    registerPage,
    registerUser
} = require('../controllers/authController');


// Register Page
router.get('/register', registerPage);


// Register User
router.post('/register', registerUser);


module.exports = router;