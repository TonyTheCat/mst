module.exports = (app, passport) => {

    app.use(function timeLog (req, res, next) {
        console.log('Time: ', Date.now());
        next()
    });

    // Root route
    app.get('/', (req, res) => {
        res.send('Root route. If already logged in => redirect to /home, else => /login');
    });

    // Login (Show login form)
    app.get('/login', (req, res) => {
        res.send('This is Login Form');
    });

    // Login (Show login form)
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',   // redirect to the restricted zone
        failureRedirect : '/login',     // redirect back to the login page with an error
        failureFlash : true             // allow flash messages
    }));

};