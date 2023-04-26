const mongoose = require("mongoose")
const Schema = mongoose.Schema

const submissionSchema = new Schema({
    studentemail: {
        type: String,
        required: true,
    },
    projectID: {
        type: String,
        required: true,
    },
    submissionLink: [
        {
            type: String
        },
    ]
})

module.exports = mongoose.model("submissions", submissionSchema)
