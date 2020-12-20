var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/shopping-api',
{useNewUrlParser: true, useUnifiedTopology: true});

// var url = process.env.DATABASEURL || "mongodb://localhost/shopping-api";
// mongoose.connect(url, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });

//alow to use promise syntax
mongoose.Promise = Promise;

module.exports.Shopping = require('./shopping');