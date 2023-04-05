const mongoose = require("mongoose")

const Schema = mongoose.Schema

// projectID(num), profEmail, studentEmail, type(num), sop, status(num)
// projectID, projectTitle, profEmail, studentEmail, type, sop, status

const applicationSchema = new Schema(
    {
        projectTitle: {
            type: String,
        },
        projectID: {
            type: Object,
        },
        profEmail: {
            type: String,
            // required: true
        },
        studentEmail: {
            type: String,
            required: true,
        },
        type: {
            // informal(0) or formal(1)
            type: Number,
            required: true,
        },
        sop: {
            type: String,
            required: true,
        },
        status: {
            // 0-> undetermined
            // 1-> accepted,
            // 2-> rejected,
            // 3-> hod approval
            // 4-> studentResponded
            type: Number,
            default: 0,
        },
        score: {
            type: Number,
            default: -1,
        },
        studentStatus: {
            // -1> undetermined
            // 0-> rejected,
            // 1-> accepted,
            type: Number,
            default: -1,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Application", applicationSchema)
