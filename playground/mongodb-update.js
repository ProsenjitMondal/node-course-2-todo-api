const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to the mongodb database', err);
    }
    const db = client.db('TodoApp');

    // findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5c9d9425b0d6bfbd852bb8d9')}, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({_id: new ObjectID('5c9d983db0d6bfbd852bbb2b')}, {
        $set: {
            name: 'John',
            email: 'john@gmail.com'
        },
        $inc: {
            age: 2
        }
    }, {returnOriginal: false}).then(result => {
        console.log(result);
    });
});