const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});
const Todo = mongoose.model('Todo', todoSchema);

// let newTodo = new Todo({
//     text: 'Something to do'
// });

// newTodo.save().then(doc => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, err => {
//     console.log('Unable to save todo', err);
// });

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

const User = mongoose.model('User', userSchema);

let newUser = new User({
    email: 'john@gmail.com  '
});

newUser.save().then(doc => {
    console.log(JSON.stringify(doc, undefined, 2));
}, err => {
    console.log('Unable to create user', err);
});