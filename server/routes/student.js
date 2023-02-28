const express = require('express')

// controller fucntion
const { signupStudent, loginStudent } = require('../controllers/studentController')
const { getProjects } = require('../controllers/projectController')
const { getApplications, createApplication, deleteApplication } = require('../controllers/applicationController')

const router = express.Router()

// login route
router.post('/login', loginStudent)

// singup route
router.post('/signup', signupStudent)

const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

// Projects
router.get('/projects', getProjects)

// Applications
router.get('/applications', getApplications)
router.post('/createApplication', createApplication)
// router.delete('/applications/:id', deleteApplication)
// router.patch('/:id', updateProject)

module.exports = router