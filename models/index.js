const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/sip', {
    keepAlive: true
})

module.exports.User = require('./user')
module.exports.Comment = require('./comment')
// module.exports.Drink = require('./drink')