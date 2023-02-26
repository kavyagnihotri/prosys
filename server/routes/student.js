const express = require('express')

// controller fucntion
const {signupStudent, loginStudent } = require('../controllers/studentController')
const {
    createProject, 
    getProjects, 
    getProject, 
    deleteProject, 
    updateProject
} = require('../controllers/projectController')

const router = express.Router()

// login route
router.post('/login', loginStudent)

// singup route
router.post('/signup', signupStudent)

const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.post('/projects', getProjects)

module.exports = router