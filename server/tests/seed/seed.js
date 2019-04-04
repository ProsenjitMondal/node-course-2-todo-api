const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

let userOneId = new ObjectID();
let userTwoId = new ObjectID();
const users = [
    {
        _id: userOneId,
        email: 'prosenjit@gmail.com',
        password: 'userOnePass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
        }]
    },
    {
        _id: userTwoId,
        email: 'john@gmail.com',
        password: 'userTwoPass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
        }]
    }
];

const todos = [
    {
        _id: new ObjectID(),
        text: 'First test todo',
        _creator: userOneId
    },
    {
        _id: new ObjectID(),
        text: 'Second test todo',
        completed: true,
        completedAt: 123,
        _creator: userTwoId
    }
];

const populateTodos = (done) => {
    Todo.deleteMany().then(() => {
        Todo.insertMany(todos);
        done();
    });
};

const populateUsers = (done) => {
    User.deleteMany().then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        return Promise.all(['userOne', 'userTwo']);
    }).then(() => {
        done();
    });
}
module.exports = {todos, users, populateTodos, populateUsers};