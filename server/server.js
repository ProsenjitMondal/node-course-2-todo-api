const express = require('express');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });
    todo.save().then(doc => {
        res.send(doc);
    }, err => {
        res.status(400).send(err.message);
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


module.exports = {app};