const Prof = require("../models/profModel")
const jwt = require("jsonwebtoken")

const createToken = (id) => {
    return jwt.sign({ _id: id, role: "1" }, process.env.SECRET, { expiresIn: "3d" })
}

const getProfs = async (req, res) => {
    const profs = await Prof.find({})
    res.status(200).json(profs)
}

const dissmissProf = async (req, res) => {
    const id = req.body.id
    try {
        profToUpdate = await Prof.findById(id)
        profToUpdate.hod = false
        profToUpdate.save()
        res.send("Updated")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const appointHOD = async (req, res) => {
    const id = req.body.id

    try {
        profToUpdate = await Prof.findById(id)
        profToUpdate.hod = true
        profToUpdate.save()
        res.send("Updated")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const loginProf = async (req, res) => {
    const { email, password } = req.body
    role = "1"

    try {
        const prof = await Prof.login(email, password)
        const token = createToken(prof._id)

        res.status(200).json({ email, role, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const signupProf = async (req, res) => {
    const { email, password, name, dept, chamber, researchInterest, websites, hod } = req.body
    role = "0"
    try {
        const prof = await Prof.signup(email, password, name, dept, chamber, researchInterest, websites, hod)

        // create a token
        const token = createToken(prof._id)

        res.status(200).json({ email, role, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getName = async(req, res) => {
  try {
    const user1 = await Prof.find({ email: req.body.email });
    return user1
  } catch (error) {
    console.error(error);
  }
}

const updateProfile = async(req, res) => {
    const id = req.params.id

    Prof.findByIdAndUpdate({ _id: id }, {
        $set: {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            dept: req.body.dept,
            chamber: req.body.chamber,
            researchInterest: req.body.researchInterest,
            websites: req.body.websites,
            hod: req.body.hod
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_result: result
        })
    })
    .catch(error=>{
        res.status(400).json({
            error: error
        })
    })
    
}

module.exports = { signupProf, loginProf, getProfs, dissmissProf, appointHOD, updateProfile, getName }
