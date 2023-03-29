const Student = require('../models/studentModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id}, process.env.SECRET, { expiresIn: '3d'})
} 

// login
const loginStudent = async (req, res) => {
    // const {email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi} = req.body
    const {email, password} = req.body
    try {
        // const student = await Student.login(email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi) 
        const student = await Student.login(email, password) 

        // create a token 
        const token = createToken(student._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// signup
const signupStudent = async (req, res) => {
    const {email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi} = req.body

    try {
        const student = await Student.signup(email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi) 

        // create a token 
        const token = createToken(student._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getStudents = async (req, res) => {
    const students = await Student.find({})
    res.status(200).json(students)
}

const updateProfile = async(req, res) => {
    const id = req.body.id

    try {
        studentToUpdate = await Student.findById(id)
        studentToUpdate.cgpa = req.body.cgpa
        studentToUpdate.cv_link = req.body.cv_link
        studentToUpdate.per_link = req.body.per_link
        studentToUpdate.aoi = req.body.aoi
        studentToUpdate.save()
        res.send("Updated")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { signupStudent, loginStudent, getStudents, updateProfile }