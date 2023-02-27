const express = require("express")
const {
    createApplication,
    getApplications,
    getApplicationsByEmail,
    createApplication,
    deleteApplication  
    // updateProject
} = require('../controllers/applicationController')
const requireAuth = require('../middleware/requireAuth')

// require auth for all projects
const router = express.Router()

// router.use(requireAuth)

// GET all applications
router.get('/', getApplications)

// GET applications by email (student)
// student id?
router.get('/applications/:id', getApplicationsByEmail)

// POST (create) application 
router.post('/createApplication', createApplication)

// DELETE a post
// :id is the _id of the applicaiton
router.delete('/applications/:id', deleteApplication)

// // UPDATE a post
// router.patch('/:id', updateProject)

module.exports = router