const globalState = require("../models/globalStatesModel")

// GET all applications
const getGlobals = async (req, res) => {
    const applications = await globalState.findOne({ email: "augsd@gmail.com" }).sort({ createdAt: -1 })
    res.status(200).json(applications)
}

const updateStatus = async (req, res) => {
    const { email, applicationStatus } = req.body
    try {
        const application = await globalState.updateOne({ email, applicationStatus } )
        res.status(200).json(application)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { getGlobals, updateStatus }
