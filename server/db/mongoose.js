const mongoose = require('mongoose');

const url = process.env.DATABASEURL || 'mongodb://localhost:27017/TodoApp';
mongoose.Promise = global.Promise;
mongoose.connect(url, {useNewUrlParser: true});

module.exports = {mongoose};