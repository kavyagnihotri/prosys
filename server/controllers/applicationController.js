const Application = require('../models/applicationModel')
const Student = require('../models/studentModel')
const Project = require('../models/ProjectModel')
const mongoose = require('mongoose')

// projectTitle, projectID(num), profEmail, studentEmail, type(num), sop, status(num)

// GET all applications
const getApplications = async (req, res) => {
    const applications = await Application.find({}).sort({ createdAt: -1 })
    res.status(200).json(applications)
}

// Create an application
const createApplication = async (req, res) => {
    const { projectID, studentEmail, type, sop } = req.body

    if(!projectID) {
        return res.status(400).json({error: 'Please fill the Project ID'})
    }

    if(!studentEmail) {
        return res.status(400).json({error: 'Please fill the Student Email'})
    }

    // if(parseInt(type) !== 1 || parseInt(type) !== 0) {
    //     return res.status(400).json({error: 'Please select Application Type: Formal or Informal'})
    // }

    const student = await Student.findOne({email: studentEmail})
    if(!student) {
        return res.status(400).json({error: 'Not a valid Student Email'})
    }

    const proj = await Project.findOne({projectID: projectID})
    if(!proj || proj['approved'] != 1) {
        return res.status(400).json({error: 'Not a valid Project ID'})
    }

    try {
        // projectID, profEmail from the project
        const project = await Project.findOne({projectID: projectID})
        const profEmail = project['professorEmail']
        const projectTitle = project['title']

        // studentEmail from the studentLogged in
        // const student_id = req.user._id
        // const studentEmail = Student.findById(student_id).select('email')

        const applicaiton = await Application.create({ projectID, projectTitle, profEmail, studentEmail, type, sop })
        res.status(200).json(applicaiton)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
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
    deleteApplication
}