const mongoose = require("mongoose")

const Schema = mongoose.Schema

const projectSchema = new Schema({
    title: {
        type: String, 
        required: true
    }, 
    projectID: {
        type: Number, 
        required: true
    },
    description: {
        type: String, 
        required: true
    }, 
    prerequisite: {
        type: String
    },
    projectType: {
        type: String,
        required: true
    },
    professorEmail: {
        type: String,
        required: true
    },
    numberOfStudents: {
        type: Number,
        required: true
    },
    approved: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

// module.exports = mongoose.model('Project Details', projectSchema)
module.exports = mongoose.model('Project', projectSchema)