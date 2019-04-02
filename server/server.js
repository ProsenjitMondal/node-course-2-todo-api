const _ = require('lodash');
const express = require('express');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });
    todo.save().then(doc => {
        res.send(doc);
    }).catch(err => {
        res.status(400).send(err.message);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then(todos => {
        res.send({todos, code: 200});
    }, err => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    // validate id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid id');
    }
    Todo.findById(id).then(todo => {
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
    res.status(200).send({todo});
    }).catch(e => {
        res.status(400).send(e);
    });
});

app.delete('/todos/:id', (req, res) => {
    let todoId = req.params.id;
    if (!ObjectID.isValid(todoId)) {
        return res.status(404).send('Invalid Id');
    }
    Todo.findByIdAndDelete(todoId).then(todo => {
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        res.status(200).send({todo});
    }).catch(e => {
        res.status(400).send(e);
    });
});

app.patch('/todos/:id', (req, res) => {
    let todoId = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(todoId)) {
        return res.status(404).send('Invalid id');
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body. completedAt = null;
    }
    Todo.findByIdAndUpdate(todoId, {$set: body}, {new: true}).then(todo => {
        if (!todo) {
            return res.status(404).send('Failed to update todo');
        }
        res.status(200).send({todo});
    }).catch(e => {
        res.status(400).send(e);
    });
});

// USER
app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then(token => {
        res.header('x-auth', token).send(user);
    }).catch(e => {
        res.status(400).send(e.message);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    
    User.findByCredentials(body.email, body.password).then(user => {
        return user.generateAuthToken().then(token => {
            res.header('x-auth', token).send(user);
        });
    }).catch(e => {
        res.status(400).send(e);
    });

});

let port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


module.exports = {app};