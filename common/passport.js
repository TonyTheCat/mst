const passport      = require('passport');
const LocalStrategy = require('passport-local');
const User          = require('../models/user');

passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
        // if(username === 'devils name' && password === '666'){
        //     done(null, {
        //         id: 666,
        //         firstname: 'devils',
        //         lastname: 'name',
        //         email: 'devil@he.ll',
        //         verified: true
        //     });
        // }
        // else {
        //     done(null, false);
        // }
    }
));

module.exports = passport;