const Category = require('../models/Category');


// ================= CATEGORY PAGE =================
const categoryPage = async (req, res) => {

    try {

        const categories = await Category.find().sort({ createdAt: -1 });

        res.render('categories/index', {
            categories
        });

    } catch (error) {

        console.log(error);
    }
};


// ================= ADD CATEGORY =================
const addCategory = async (req, res) => {

    try {

        const { name } = req.body;

        // Check Existing
        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {

            req.flash('error_msg', 'Category already exists');

            return res.redirect('/categories');
        }

        // Create Category
        await Category.create({
            name
        });

        req.flash('success_msg', 'Category added successfully');

        res.redirect('/categories');

    } catch (error) {

        console.log(error);

        res.redirect('/categories');
    }
};


// ================= DELETE CATEGORY =================
const deleteCategory = async (req, res) => {

    try {

        await Category.findByIdAndDelete(req.params.id);

        req.flash('success_msg', 'Category deleted successfully');

        res.redirect('/categories');

    } catch (error) {

        console.log(error);

        res.redirect('/categories');
    }
};


module.exports = {
    categoryPage,
    addCategory,
    deleteCategory
};