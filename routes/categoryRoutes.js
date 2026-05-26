const express = require('express');

const router = express.Router();

const isAuthenticated = require('../middlewares/authMiddleware');

const {
    categoryPage,
    addCategory,
    deleteCategory
} = require('../controllers/categoryController');


// Category Page
router.get('/', isAuthenticated, categoryPage);


// Add Category
router.post('/add', isAuthenticated, addCategory);


// Delete Category
router.get('/delete/:id', isAuthenticated, deleteCategory);


module.exports = router;