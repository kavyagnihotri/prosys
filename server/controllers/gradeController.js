const gradeState = require("../models/gradeModel")

const getOneGrade = async (req, res) => {
    // get grade of a student in the given project
    const { studentemail, projectID } = req.body
    try {
        const gradeDoc = await gradeState.findOne({ studentemail: studentemail, projectID: projectID })
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
    const { studentemail } = req.body
    try {
        const gradeDoc = await gradeState.findOne({ studentemail: studentemail })
        res.status(200).json(gradeDoc)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateMidsemGrade = async (req, res) => {
    const { studentemail, projectID, midsemGrade } = req.body
    try {
        let gradeDoc = await gradeState.findOne({ studentemail: studentemail, projectID: projectID })
        if (!gradeDoc) {
            gradeDoc = await gradeState.create({
                studentemail: studentemail,
                projectID: projectID,
                midsemGrade: midsemGrade,
            })
        } else {
            gradeDoc.midsemGrade = midsemGrade
            gradeDoc.save()
        }
        console.log(gradeDoc)
        res.status(200).json(gradeDoc)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateCompreGrade = async (req, res) => {
    const { studentemail, projectID, compreGrade } = req.body
    try {
        let gradeDoc = await gradeState.findOne({ studentemail: studentemail, projectID: projectID })
        if (!gradeDoc) {
            gradeDoc = await gradeState.create({
                studentemail: studentemail,
                projectID: projectID,
                compreGrade: compreGrade,
            })
        } else {
            gradeDoc.compreGrade = compreGrade
            gradeDoc.save()
        }
        console.log(gradeDoc)
        res.status(200).json(gradeDoc)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { getOneGrade, getAllProjectGrade, getAllStudentGrade, updateMidsemGrade, updateCompreGrade }
