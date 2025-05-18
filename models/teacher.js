const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
}, { timestamps: true })
const teacherModel = mongoose.model('Teacher', teacherSchema)
module.exports = teacherModel