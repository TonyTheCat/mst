const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const user = require('../models/user')

/* GET index */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res, next) => {

    const payload = { admin: user.admin };

    let token = jwt.sign(payload, 'secret', { expiresIn: 1200 });
    console.log('LOGIN AND GET THE TOKEN', token);
    // Return token and status
    res.json({
        status: 200,
        token: token
    });
});

module.exports = router;
