const PORT = process.env.PORT || 3000
const MONGOHOST = process.env.MONGOHOST
const MONGOPASSWORD = process.env.MONGOPASSWORD
const MONGOPORT = process.env.MONGOPORT || 2017
const MONGOUSER = process.MONGOUSER
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1/notes-db-app'

module.exports = {
    PORT,
    MONGOHOST,
    MONGOPASSWORD,
    MONGOPORT,
    MONGOUSER,
    MONGO_URL
}
