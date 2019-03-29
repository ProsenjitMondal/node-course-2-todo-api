const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});

let todoSchema = new mongoose.Schema({
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});
let Todo = mongoose.model('Todo', todoSchema);

// let newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then(doc => {
//     console.log('Saved todo', doc);
// }, err => {
//     console.log('Unable to save todo', err);
// });

let newTodo = new Todo({
    text: 'Walk the dog',
    completed: true,
    completedAt: 12
});

newTodo.save().then(doc => {
    console.log('Saved todo', doc);
}, err => {
    console.log('Unable to save todo', err);
});