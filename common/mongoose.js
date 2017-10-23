const mongoose = require('mongoose');
const config = require('../config/config');

// Connection to DB
db = mongoose.connect(config.database);

// POST request parser
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

console.log('===MONGOOSE COMMON===');

module.exports = db;
