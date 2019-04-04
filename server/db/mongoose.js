const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true, useCreateIndex: true});

module.exports = {mongoose};