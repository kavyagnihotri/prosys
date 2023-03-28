const Student = require("../models/studentModel")
const jwt = require("jsonwebtoken")

const createToken = (id) => {
    return jwt.sign({ _id: id, role: "2" }, process.env.SECRET, { expiresIn: "3d" })
}

// login
const loginStudent = async (req, res) => {
    // const {email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi} = req.body
    const { email, password } = req.body
    role = "2"
    try {
        // const student = await Student.login(email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi)
        const student = await Student.login(email, password)

        // create a token
        const token = createToken(student._id)

        res.status(200).json({ email, role, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup
const signupStudent = async (req, res) => {
    const { email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi } = req.body

    try {
        const student = await Student.signup(email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi)

        // create a token
        const token = createToken(student._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getStudents = async (req, res) => {
    const students = await Student.find({})
    res.status(200).json(students)
}

module.exports = { signupStudent, loginStudent, getStudents }
