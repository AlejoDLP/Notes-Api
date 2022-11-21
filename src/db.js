const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1/notes-db-app', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log('Db connected'))
    .catch((err) => console.log(err))
