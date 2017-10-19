const passport = require('passport');
const Strategy = require('passport-local');

passport.use(new Strategy(
    (username, password, done) => {
        if(username === 'devils name' && password === '666'){
            done(null, {
                id: 666,
                firstname: 'devils',
                lastname: 'name',
                email: 'devil@he.ll',
                verified: true
            });
        }
        else {
            done(null, false);
        }
    }
));

module.exports = passport;