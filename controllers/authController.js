const bcrypt = require('bcryptjs');

const User = require('../models/User');


// Register Page
const registerPage = (req, res) => {

    res.render('auth/register');
};


// Register User
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Check Existing User
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            req.flash('error_msg', 'Email already exists');

            return res.redirect('/auth/register');
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        await User.create({
            name,
            email,
            password: hashedPassword
        });

        req.flash('success_msg', 'Registration successful');

        res.redirect('/auth/register');

    } catch (error) {

        console.log(error);

        res.redirect('/auth/register');
    }

};


module.exports = {
    registerPage,
    registerUser
};