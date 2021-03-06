module.exports = {
    loggued(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/signin/');
    },
    notLoggued(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/users/');
    }
}