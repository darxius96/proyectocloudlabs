const passport = require('passport');
const LocalStrategy = require('passport-local');
const UserModel = require('../models/UserModel');
const { comparePassword } = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const queryOne = await UserModel.findOne({ username: username });
    if (queryOne !== null) {
        const validPassword = await comparePassword(password, queryOne.password);
        if (validPassword) {
            const user = queryOne;
            done(null, user, req.flash('notifications', 'Welcome'));
        } else {
            done(null, false, req.flash('notifications', 'Incorrect Password'));
        }
    } else {
        return done(null, false, req.flash('notifications', 'User not exist'));
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findOne({ id: id });
    done(null, user);
});