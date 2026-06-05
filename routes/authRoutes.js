const express = require('express');

const router = express.Router();

const {
    registerPage,
    registerUser,
    loginPage,
    loginUser,
    logoutUser
} = require('../controllers/authController');


// Register
router.get('/register', registerPage);

router.post('/register', registerUser);

// Login
router.get('/login', loginPage);

router.post('/login', loginUser);


// Logout
router.get('/logout', logoutUser);


module.exports = router;