const Augsd = require('../models/augsdModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id}, process.env.SECRET, { expiresIn: '3d'})
} 

// login
const loginAugsd = async (req, res) => {
    const {email, password} = req.body
    console.log({email,password})
    try {
        const augsd = await Augsd.login(email, password) 
        console.log({augsd})
        // create a token 
        const token = createToken(augsd._id)

        res.status(200).json({email, token})
    } catch (error) {
        console.log("here");
        res.status(400).json({error: error.message})
    }

}

module.exports = { loginAugsd }