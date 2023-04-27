const submissionState = require("../models/SubmissionModel")

const getOneSubmission = async (req, res) => {
    // get grade of a student in the given project
    const { studentemail, projectID } = req.body
    try {
        const gradeDoc = await submissionState.findOne({ studentemail: studentemail, projectID: projectID })
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
    const { studentemail } = req.body
    try {
        const gradeDoc = await submissionState.findOne({ studentemail: studentemail })
        res.status(200).json(gradeDoc)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createSubmission = async (req, res) => {
    const { studentemail, projectID, submissionLink } = req.body
    try {
        let gradeDoc = await submissionState.findOne({ studentemail: studentemail, projectID: projectID })
        if (!gradeDoc) {    
            gradeDoc = await submissionState.create({
                studentemail: studentemail,
                projectID: projectID,
                submissionLink: [submissionLink],
            })
        } else {
            gradeDoc.submissionLink.push(submissionLink)
            gradeDoc.save()
        }
        res.status(200).json(gradeDoc)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { getOneSubmission, getAllProjectSubmissions, getAllStudentSubmission, createSubmission }
