const mongoose = require('mongoose');

let url;

let env = process.env.NODE_ENV || 'development';

if(env === 'production') {
    url = process.env.DATABASEURL;
} else if (env === 'development') {
    url = 'mongodb://localhost:27017/TodoApp';
    process.env.PORT = 3000;
} else if (env === 'test') {
    url = 'mongodb://localhost:27017/TodoAppTest';
    process.env.PORT = 6000;
}

mongoose.Promise = global.Promise;
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true});

module.exports = {mongoose};