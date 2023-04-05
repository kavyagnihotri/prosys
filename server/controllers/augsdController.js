const Augsd = require("../models/augsdModel")
const Project = require("../models/ProjectModel")
const jwt = require("jsonwebtoken")

const createToken = (id) => {
    return jwt.sign({ _id: id, role: "0" }, process.env.SECRET, { expiresIn: "3d" })
}

// login
const loginAugsd = async (req, res) => {
    const { email, password } = req.body
    role = "0"
    try {
        const augsd = await Augsd.login(email, password)
        const token = createToken(augsd._id)
        res.status(200).json({ email, role, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const acceptProject = async (req, res) => {
    const id = req.body.id

    try {
        projectToUpdate = await Project.findById(id)
        projectToUpdate.approved = 1
        projectToUpdate.save()
        res.send("Updated")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const rejectProject = async (req, res) => {
    console.log(req.body)
    const id = req.body.id
    const rec = req.body.recommendation
    try {
        projectToUpdate = await Project.findById(id)
        projectToUpdate.recommendation = rec
        projectToUpdate.approved = -1
        projectToUpdate.save()
        res.send("Updated")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { loginAugsd, acceptProject, rejectProject }
