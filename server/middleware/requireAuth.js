const jwt = require('jsonwebtoken')
const Student = require('../models/studentModel')
const Augsd = require('../models/augsdModel')
const Prof = require('../models/profModel')

const requireAuth = async (req, res, next) => {
    // verify
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
        req.student = await Student.findOne({ _id }).select('_id')
        req.augsd = await Augsd.findOne({_id }).select('_id')
        req.prof = await Prof.findOne({ _id }).select('_id')
        next()

    } catch (error) {
        
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth