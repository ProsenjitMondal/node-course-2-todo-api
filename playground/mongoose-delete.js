const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');

const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.findByIdAndDelete('5c9eddb9b0d6bfbd852c2786').then(todos => {
    console.log(todos);
});

// DELETE
/*
Model.deleteOne()
Model.deleteMany()
Model.findOneAndDelete() // return the doc
Model.findByIdAndDelete() // return the doc
*/

// FIND
/*
Model.find()
Model.findOne()
Model.findById()
*/

// REMOVE
/*
Model.findOneAndRemove()
Model.findByIdAndRemove()
*/

// UPDATE
/*
Model.updateOne()
Model.updateMany()
Model.findOneAndUpdate()
Model.findByIdAndUpdate()
*/

// REPLACE
/*
Model.replaceOne()
*/