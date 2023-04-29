const Project = require("../models/ProjectModel")
const Application = require("../models/applicationModel")
const Professor = require("../models/profModel")
const Student = require("../models/studentModel")
const mongoose = require("mongoose")

// GET all projects
const getProjects = async (req, res) => {
    const projects = await Project.find({}).sort({ createdAt: -1 })
    res.status(200).json(projects)
}

// GET a single project
const getProject = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID, No such project" })
    }

    const project = await Project.findById(id)

    if (!project) {
        return res.status(404).json({ error: "No such project" })
    }

    res.status(200).json(project)
}

// GET approved projects
const getApprovedProjects = async (req, res) => {
    const approvedProjects = await Project.find({ approved: 1 })
    if (!approvedProjects) {
        return res.status(404).json({ error: "No such approved projects" })
    }
    res.status(200).json(approvedProjects)
}

const getPendingProjects = async (req, res) => {
    const pendingProjects = await Project.find({ approved: 0 })
    if (!pendingProjects) {
        return res.status(404).json({ error: "No such pending projects" })
    }
    res.status(200).json(pendingProjects)
}

// Create a project
const createProject = async (req, res) => {
    const { title, projectID, description, prerequisite, projectType, professorEmail, numberOfStudents, approved } =
        req.body
    let emptyfields = []

    if (!title) {
        emptyfields.push("title")
    }

    if (!projectID) {
        emptyfields.push("projectID")
    }

    if (!description) {
        emptyfields.push("description")
    }

    if (emptyfields.length > 0) {
        return res.status(400).json({ error: "Please fill the empty fields", emptyfields })
    }

    try {
        const project = await Project.create({
            title,
            projectID,
            description,
            prerequisite,
            projectType,
            professorEmail,
            numberOfStudents,
            approved,
        })
        res.status(200).json(project)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a project
const deleteProject = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such project" })
    }

    const project = await Project.findOneAndDelete({ _id: id })

    if (!project) {
        return res.status(404).json({ error: "No such project" })
    }

    res.status(200).json(project)
}

// update a project
const updateFormalProjectStatus = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such project" })
    }

    const project = await Project.findOneAndUpdate(
        { _id: id },
        { scoreReleased: 1 },
        { new: true } // Return the updated document
    )
    const applications = await Application.find({ type: 1, projectID: id, score: { $ne: -1 } }).sort({
        score: -1,
        createdAt: -1,
    })
    const studNo = project.numberOfStudents
    const pEmail = project.professorEmail
    const prof = await Professor.find({ email: pEmail })
    const pDept = prof.dept
    let count = 0

    while (applications.length > 0 && count < studNo) {
        const currApplication = applications[count]
        const { studentEmail } = currApplication
        const student = await Student.find({ email: studentEmail })
        const sDept = student.dept
        if (student[0].dept !== prof[0].dept) {
            currApplication.status = 3
            await currApplication.save()
        } else {
            currApplication.status = 1
            await currApplication.save()
        }
        count += 1
    }
    while (count < applications.length) {
        const currApplication = applications[count]
        currApplication.status = 2
        await currApplication.save()
        count += 1
    }
    if (!project) {
        return res.status(404).json({ error: "No such project" })
    }

    res.status(200).json(project)
}

const updateInformalProjectStatus = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such project" })
    }

    const project = await Project.findOneAndUpdate(
        { _id: id },
        { informalScoreReleased: 1 },
        { new: true } // Return the updated document
    )

    const applications = await Application.find({ type: 0, projectID: id, score: { $ne: -1 } }).sort({
        score: -1,
        createdAt: -1,
    })
    const studNo = project.numberOfStudents
    let count = 0
    console.log(applications)
    while (applications.length > 0 && count < studNo) {
        const currApplication = applications[count]
        currApplication.status = 1
        await currApplication.save()
        count += 1
    }
    while (count < applications.length) {
        const currApplication = applications[count]
        currApplication.status = 2
        await currApplication.save()
        count += 1
    }

    if (!project) {
        return res.status(404).json({ error: "No such project" })
    }
    console.log("done")
    res.status(200).json(project)
}

module.exports = {
    createProject,
    getProjects,
    getProject,
    deleteProject,
    updateFormalProjectStatus,
    updateInformalProjectStatus,
    getApprovedProjects,
    getPendingProjects,
}
