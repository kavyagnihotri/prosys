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
}, {timestamps: true})

module.exports = mongoose.model('Project', projectSchema)