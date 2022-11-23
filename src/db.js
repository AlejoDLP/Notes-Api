const mongoose = require('mongoose')
const { MONGO_URL } = require('./config/config')

mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log('Db connected'))
    .catch((err) => console.log(err))
