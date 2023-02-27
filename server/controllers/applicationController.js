const Application = require('../models/applicationModel')
const mongoose = require('mongoose')

// projectTitle, 
// projectID, studentEmail, professorEmail, type, sop, status

// GET all applications
const getApplications = async(req, res) => {
    const applications = await Application.find({}).sort({createdAt: -1})
    res.status(200).json(applications)
}

// GET applications of a particular student user
const getApplicationsByEmail = async (req, res) => {

    // get student email


    // const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such project"})
    }

    const applications = await Application.findById(id)

    if(!applications) {
        return res.status(404).json({error: "No such Application"})
    }

    res.status(200).json(applications)
}

// Create an application
const createApplication = async (req, res) => {
    const { projectID, studentEmail, professorEmail, type, sop, status } = req.body
    status = 0

    console.log(req.body)

    // projectID from the project
    // studentEmail from the studentLogged in
    // profEmail from the project

    try {
        const applicaiton = await Application.create({ projectID, studentEmail, professorEmail, type, sop, status })
        res.status(200).json({ projectID, studentEmail, professorEmail, type, sop, status })
    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}

// delete an applciation
const deleteApplication = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such project"})
    }

    const applicaiton = await Application.findOneAndDelete({_id: id})

    if(!applicaiton) {
        return res.status(404).json({error: "No such applicaiton"})
    }

    res.status(200).json(applicaiton)
}

// get approvedApplications
// const getApprovedApplications = async(req, res) => {
//     const applications = await Application.find({}).sort({createdAt: -1})
//     res.status(200).json(applications)
// }

// update a project
// const updateApplication = async (req, res) => {
//     const { id } = req.params

//     if(!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: "No such project"})
//     }

//     const project = await Project.findOneAndUpdate({_id: id}, {
//         ...req.body
//         // title: 'monkeys'
//     })

//     if(!project) {
//         return res.status(404).json({error: "No such project"})
//     }

//     res.status(200).json(project)
// }


module.exports = {
    createApplication,
    getApplications,
    getApplicationsByEmail,
    createApplication,
    deleteApplication 
}