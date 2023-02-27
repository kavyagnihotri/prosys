const express = require('express')

// controller fucntion
const { signupStudent, loginStudent } = require('../controllers/studentController')
const { getProjects } = require('../controllers/projectController')
const { createApplication } = require('../controllers/applicationController')


const router = express.Router()

// login route
router.post('/login', loginStudent)

// singup route
router.post('/signup', signupStudent)

// POST (create application)

// GET applications by email (student)
// student id?
// router.get('/applications', getApplicationsByEmail)

// DELETE
// :id is the _id of the applicaiton
// router.delete('/applications/:id', deleteApplication)

// // UPDATE a post
// router.patch('/:id', updateProject)
// router.post('/createApplication', createApplication)

const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

// Projects
router.post('/projects', getProjects)

// Applications
router.post('/createApplication', createApplication)

module.exports = router