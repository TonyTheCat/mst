const mongoose = require('mongoose');

// define the schema for our user model
const userSchema = mongoose.Schema({
    local            : {
        email        : String,
        password     : String
    }
});

module.exports = userSchema;