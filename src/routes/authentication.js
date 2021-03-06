const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { notLoggued } = require('../lib/auth');

router.get('/signin/', notLoggued, (req, res) => {
    res.render('auth/signin');
});

router.route('/signin').post( async (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/users/',
        failureRedirect: '/signin/',
        failureFlash: true
    })(req, res, next);
});

router.route('/logout').get(async (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;