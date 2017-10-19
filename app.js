const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('./common/passport');
const jwt = require('jsonwebtoken');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Passport
app.use(passport.initialize());
app.post('/auth', passport.authenticate(
    'local', {
        session: false
    }), serialize, generateToken, respond);


function serialize(req, res, next) {
    db.updateOrCreate(req.user, function(err, user){
        if(err) {return next(err);}
        // we store the updated information in req.user again
        req.user = {
            id: user.id
        };
        next();
    });
}

function generateToken(req, res, next) {
    console.log('==generateToken==');
    req.token = jwt.sign({
        id: req.user.id,
    }, 'server secret', {
        expiresIn: 120000
    });
    next();
}

function respond(req, res) {
    res.status(200).json({
        user: req.user,
        token: req.token
    });
}

const db = {
    updateOrCreate: function(user, cb){
        // db dummy, we just cb the user
        cb(null, user);
    }
};

// Router
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
