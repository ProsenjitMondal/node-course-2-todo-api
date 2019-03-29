const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to the mongodb database', err);
    }
    const db = client.db('TodoApp');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Something to do'}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Something to do one'}).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
    //     console.log(result);
    // });

    // deleteMany
    // db.collection('Users').deleteMany({name: 'Prosenjit'}).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    db.collection('Users').findOneAndDelete({_id: new ObjectID('5c9d9824b0d6bfbd852bbb17')}).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });

});