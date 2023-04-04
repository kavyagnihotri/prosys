const Application = require("../models/applicationModel")
const Student = require("../models/studentModel")
const Project = require("../models/ProjectModel")
const mongoose = require("mongoose")

// projectTitle, projectID(num), profEmail, studentEmail, type(num), sop, status(num)

// GET all applications
const getApplications = async (req, res) => {
    const applications = await Application.find({}).sort({ createdAt: -1 })
    res.status(200).json(applications)
}

// Create an application
const createApplication = async (req, res) => {
    const { projectID, studentEmail, type, sop } = req.body
    try {
        if (!projectID) {
            return res.status(400).json({ error: "Please fill the Project ID" })
        }

        if (!studentEmail) {
            return res.status(400).json({ error: "Please fill the Student Email" })
        }

        const student = await Student.findOne({ email: studentEmail })
        if (!student) {
            return res.status(400).json({ error: "Not a valid Student Email" })
        }

        const proj = await Project.findOne({ _id: projectID })
        if (!proj || proj["approved"] != 1) {
            return res.status(400).json({ error: "Not a valid Project ID" })
        }

        // studentEmail from the studentLogged in sent by frontend
        // projectID, profEmail from the project
        const project = await Project.findOne({ _id: projectID })
        const profEmail = project["professorEmail"]
        const projectTitle = project["title"]
        const applicaiton = await Application.create({ projectTitle, projectID, profEmail, studentEmail, type, sop })
        project.applicants.push(studentEmail)
        await project.save()

        res.status(200).json(applicaiton)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const addScore = async (req, res) => {
    const { appId, newScore } = req.body
    console.log(req.body)
    console.log(appId, newScore)
    try {
        appToUpdate = await Application.findById(appId)
        // console.log(appToUpdate)
        appToUpdate.score = newScore
        appToUpdate.save()
        res.send("updated")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateStatus = async (req, res) => {
    const { appId, status } = req.body
    console.log(req.body)
    try {
        appToUpdate = await Application.findById(appId)
        // console.log(appToUpdate)
        appToUpdate.status = status
        appToUpdate.save()
        res.status(200).json("Updated")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getInformal = async (req, res) => {
    const applications = await Application.find({ type: 0 }).sort({ score: "desc" })
    res.status(200).json(applications)
}

// delete an applciation
const deleteApplication = async (req, res) => {
    // const { id } = req.params
    // if(!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).json({error: "No such project"})
    // }
    // const applicaiton = await Application.findOneAndDelete({_id: id})
    // if(!applicaiton) {
    //     return res.status(404).json({error: "No such applicaiton"})
    // }
    // res.status(200).json(applicaiton)
}

module.exports = {
    getApplications,
    createApplication,
    deleteApplication,
    addScore,
    getInformal,
    updateStatus,
}
