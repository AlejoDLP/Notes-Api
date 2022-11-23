const { Schema, model } = require('mongoose')

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String
    }
})

module.exports = model('Note', NoteSchema)
