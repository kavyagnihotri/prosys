const Student = require("../models/studentModel")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

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

const getStudent = async (req, res) => {
    const email = req.params.id
    try {
        const student = await Student.findOne({ email })

        if (!student) {
            return res.status(404).json({ error: "Professor not found" })
        }
        res.status(200).json(student)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

const getName = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID, No such student" })
    }

    const student = await Student.findById(id)

    if (!student) {
        return res.status(404).json({ error: "No such student" })
    }

    res.status(200).json(student)
}

const updateProfile = async(req, res) => {
    const id = req.params.id

    Student.findByIdAndUpdate(
        { _id: id },
        {
            $set: {
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                studentID: req.body.studentID,
                dept: req.body.dept,
                cgpa: req.body.cgpa,
                cv_link: req.body.cv_link,
                per_link: req.body.per_link,
                aoi: req.body.aoi,
            },
        }
    )
        .then((result) => {
            res.status(200).json({
                updated_result: result,
            })
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            })
        })
}

module.exports = { signupStudent, loginStudent, getStudents, getStudent, updateProfile, getName}