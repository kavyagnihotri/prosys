const globalState = require("../models/globalStatesModel")
// GET all applications
const getGlobals = async (req, res) => {
    const applications = await globalState.find({}).sort({ createdAt: -1 })
    res.status(200).json(applications)
}
const updateStatus = async (req, res) => {
    const { status } = req.body
    try {
        const application = await globalState.findOne({ email: "augsd@gmail.com" })
        application.status = status
        await application.save()
        res.status(200)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getGlobals,
    updateStatus,
}
