const mongoose = require("mongoose")

const Schema = mongoose.Schema

const applicationSchema = new Schema({
    profEmail: {
        type: String, 
        required: true
    }, 
    studentEmail: {
        type: Number, 
        required: true
    },
    sop: {
        type: String, 
        required: true
    }
}, {timestamps: true})

// module.exports = mongoose.model('Project Details', projectSchema)
module.exports = mongoose.model('Application', applicationSchema)