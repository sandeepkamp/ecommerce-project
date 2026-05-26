require('dotenv').config();

const express = require('express');

const session = require('express-session');

const flash = require('connect-flash');

const path = require('path');

const connectDB = require('./config/db');

const app = express();


// Database Connection
connectDB();


// Middleware
app.use(express.urlencoded({ extended: true }));

app.use(express.json());


// Static Folder
app.use(express.static(path.join(__dirname, 'public')));


// View Engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));


// Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


// Flash Messages
app.use(flash());


// Global Variables
app.use((req, res, next) => {

    res.locals.success_msg = req.flash('success_msg');

    res.locals.error_msg = req.flash('error_msg');

    // Logged In User
    res.locals.user = req.session.user || null;

    next();
});

// Routes
app.use('/', require('./routes/web'));
app.use('/auth', require('./routes/authRoutes'));

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});