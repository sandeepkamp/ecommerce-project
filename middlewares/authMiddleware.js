const isAuthenticated = (req, res, next) => {

    // Check Session
    if (req.session.user) {

        return next();
    }

    // If not logged in
    req.flash('error_msg', 'Please login first');

    res.redirect('/auth/login');
};

module.exports = isAuthenticated;