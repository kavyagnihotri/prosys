const submissionState = require("../models/SubmissionModel")

const getOneSubmission = async (req, res) => {
    // get grade of a student in the given project
    const { studentEmail, projectID } = req.body
    try {
        const gradeDoc = await submissionState.findOne({ studentemail: studentEmail, projectID: projectID })
        res.status(200).json(gradeDoc)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const getAllProjectSubmissions = async (req, res) => {
    // get all grades of the given project
    const { projectID } = req.body
    try {
        const gradeDoc = await submissionState.findOne({ projectID: projectID })
        res.status(200).json(gradeDoc)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const getAllStudentSubmission = async (req, res) => {
    // get all grades of the given project
    const { studentEmail } = req.body
    try {
        const gradeDoc = await submissionState.findOne({ studentemail: studentEmail })
        res.status(200).json(gradeDoc)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createSubmission = async (req, res) => {
    const { studentEmail, projectID, link } = req.body
    try {
        const gradeDoc = await submissionState.create({
            studentemail: studentEmail,
            projectID: projectID,
            submissionLink: link,
        })
        res.status(200).json(gradeDoc)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { getOneSubmission, getAllProjectSubmissions, getAllStudentSubmission, createSubmission }
