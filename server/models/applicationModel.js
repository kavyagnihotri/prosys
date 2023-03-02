const mongoose = require("mongoose")

const Schema = mongoose.Schema

// projectID(num), profEmail, studentEmail, type(num), sop, status(num)
// projectID, projectTitle, profEmail, studentEmail, type, sop, status

const applicationSchema = new Schema({
    projectID: {
        type: Number,
        required: true
    },
    projectTitle: {
        type: String,
    },
    profEmail: {
        type: String, 
        // required: true
    }, 
    studentEmail: {
        type: String, 
        required: true
    },
    type: {
        // informal(0) or formal(1)
        type: Number,
        required: true
    },
    sop: {
        type: String, 
        required: true
    },
    status: {
        // 0-> undetermined
        // 1-> accepted,
        // 2-> rejected,
        // 3-> hod approval
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('Application', applicationSchema)