const passport = require('../common/passport')
const router = require('express').Router();
const User = require('../models/user');

    router.get('/sign_up', (req, res) => {
       let user = new User;
       user.save((err) => {
           if (err) throw err;
           console.log('User was saved successfully');
       });
        return res.json( {status: 200} )
    });

    // Root route
    router.get('/', (req, res) => {
        res.send('Root route. If already logged in => redirect to /home, else => /login');
    });

    // Login (Show login form)
    router.get('/login', (req, res) => {
        res.send('This is Login Form');
    });

    // Login (Show login form)
    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',   // redirect to the restricted zone
        failureRedirect : '/login',     // redirect back to the login page with an error
        failureFlash : true             // allow flash messages
    }));

module.exports = router;


