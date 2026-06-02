const bcrypt = require('bcryptjs');

const User = require('../models/user');


// ================= REGISTER PAGE =================
const registerPage = (req, res) => {

    res.render('auth/register');
};


// ================= REGISTER USER =================
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

        res.redirect('/auth/login');

    } catch (error) {

        console.log(error);

        res.redirect('/auth/register');
    }

};


// ================= LOGIN PAGE =================
const loginPage = (req, res) => {

    res.render('auth/login');
};


// ================= LOGIN USER =================
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check User
        const user = await User.findOne({ email });

        if (!user) {

            req.flash('error_msg', 'Invalid Email');

            return res.redirect('/auth/login');
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            req.flash('error_msg', 'Invalid Password');

            return res.redirect('/auth/login');
        }

        // Create Session
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        req.flash('success_msg', 'Login successful');

        res.redirect('/dashboard');

    } catch (error) {

        console.log(error);

        res.redirect('/auth/login');
    }

};


// ================= LOGOUT =================
const logoutUser = (req, res) => {

    req.session.destroy(() => {

        res.redirect('/auth/login');
    });
};


module.exports = {
    registerPage,
    registerUser,
    loginPage,
    loginUser,
    logoutUser
};