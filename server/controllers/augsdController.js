const Augsd = require('../models/augsdModel')
const Project = require('../models/ProjectModel')
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
        
        // create a token 
        const token = createToken(augsd._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const acceptProject = async(req,res) =>{
    const id=req.body.id
    console.log({id})
    try{
        projectToUpdate = await Project.findById(id)
        projectToUpdate.approved=1;
        projectToUpdate.save()
        res.send("Updated")
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const rejectProject = async(req,res) =>{
    const id=req.body.id
    console.log({id})
    try{
        projectToUpdate = await Project.findById(id)
        projectToUpdate.approved=-1;
        projectToUpdate.save()
        res.send("Updated")
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginAugsd , acceptProject , rejectProject }