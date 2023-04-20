const gradeState = require("../models/gradeModel")

const getOneGrade = async (req, res) => {
    // get grade of a student in the given project
    const { studentEmail, projectID } = req.body
    try {
        const gradeDoc = await gradeState.findOne({ studentemail: studentEmail, projectID: projectID })
        res.status(200).json(gradeDoc)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const getAllProjectGrade = async (req, res) => {
    // get all grades of the given project
    const { projectID } = req.body
    try {
        const gradeDoc = await gradeState.findOne({ projectID: projectID })
        res.status(200).json(gradeDoc)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const getAllStudentGrade = async (req, res) => {
    // get all grades of the given project
    const { studentEmail } = req.body
    try {
        const gradeDoc = await gradeState.findOne({ studentemail: studentEmail })
        res.status(200).json(gradeDoc)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateGrade = async (req, res) => {
    const { studentEmail, projectID, grade } = req.body
    try {
        const gradeDoc = await gradeState.findOne({ studentemail: studentEmail, projectID: projectID })
        gradeDoc.grade = grade
        gradeDoc.save()
        res.status(200).json(gradeDoc)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { getOneGrade, getAllProjectGrade, getAllStudentGrade, updateGrade }
