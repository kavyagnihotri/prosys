const mongoose = require("mongoose")
const Schema = mongoose.Schema

const gradeSchema = new Schema({
    studentemail: {
        type: String,
        required: true,
    },
    projectID: {
        type: String,
        required: true,
    },
    compreGrade: {
        type: String,
    },
    midsemGrade: {
        type: String,
    },
})

module.exports = mongoose.model("grade", gradeSchema)
