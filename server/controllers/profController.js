const Prof = require('../models/profModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

const loginProf = async (req, res) => {
    res.json({mssg : "login"})
}

const signupProf = async (req, res) => {

    const {email, password, name, dept, chamber, researchInterest, websites, hod} = req.body

    try {
        const prof = await Prof.signup(email, password, name, dept, chamber, researchInterest, websites, hod)
        
        // create a token
        const token = createToken(prof._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { signupProf, loginProf }