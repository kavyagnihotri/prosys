const Application = require('../models/projectApplicationModel')
const mongoose = require('mongoose')

// GET all projects
const getApplications = async(req, res) => {
    const applications = await Application.find({}).sort({createdAt: -1})
    res.status(200).json(applications)
}

// GET a single project
const getApplication = async (req, res) => {
    // gets the id at the address
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such project"})
    }

    const applications = await Application.findById(id)

    if(!applications) {
        return res.status(404).json({error: "No such project"})
    }

    res.status(200).json(applications)
}

// create a project
const createProject = async (req, res) => {
    const {title, projectID, description, prerequisite, projectType, professorEmail, numberOfStudents, approved } = req.body
    console.log(req.body)
    let emptyfields = []

    if(!title) {
        emptyfields.push('title')
    }

    if(!projectID) {
        emptyfields.push('projectID')
    }

    if(!description) {
        emptyfields.push('description')
    }

    if(emptyfields.length > 0) {
        return res.status(400).json({error: 'Please fill the empty fields', emptyfields})
    }


    try {
       const project = await Project.create({title, projectID, description, prerequisite, projectType, professorEmail, numberOfStudents, approved })
        res.status(200).json({title, projectID, description, prerequisite, projectType, professorEmail, numberOfStudents, approved })
    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}

// delete a project
// const deleteProject = async (req, res) => {
//     const { id } = req.params

//     if(!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: "No such project"})
//     }

//     const project = await Project.findOneAndDelete({_id: id})

//     if(!project) {
//         return res.status(404).json({error: "No such project"})
//     }

//     res.status(200).json(project)
// }

// update a project
// const updateProject = async (req, res) => {
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
    
}