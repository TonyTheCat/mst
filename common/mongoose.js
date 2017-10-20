const mongoose = require('mongoose');
const config = require('./config');

// Connection to DB
mongoose.connect(config.database);
app.set('secret', config.secret);

// POST request parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log('MONGOOSE COMMON');
module.exports = db;
