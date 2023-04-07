const mongoose = require("mongoose")

const Schema = mongoose.Schema

const projectSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        projectID: {
            type: Number,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        prerequisite: {
            type: String,
        },
        projectType: {
            type: String,
            required: true,
        },
        professorEmail: {
            type: String,
            required: true,
        },
        recommendation: {
            type: String,
            default: "",
        },
        numberOfStudents: {
            type: Number,
            required: true,
        },
        approved: {
            type: Number,
            default: 0,
        },
        applicants: [
            {
                type: String,
            },
        ],
        acceptedStudents: [
            {
                type: String,
            },
        ],
    },
    { timestamps: true }
)

module.exports = mongoose.model("Project", projectSchema)
