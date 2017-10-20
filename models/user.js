const mongoose = require('mongoose');
const schema = require('./schemas/users');
const bcrypt   = require('bcrypt-nodejs');

// generating a hash
schema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', schema);