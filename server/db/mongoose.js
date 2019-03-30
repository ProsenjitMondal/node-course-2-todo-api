const mongoose = require('mongoose');

const DB_URI = process.env.DATABASE || 'mongodb://localhost:27017/TodoApp';
mongoose.Promise = global.Promise;
mongoose.connect(DB_URI, {useNewUrlParser: true});

module.exports = {mongoose};