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

// const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// router.use(requireAuth)

// login route
router.post('/login', loginStudent)

// singup route
router.post('/signup', signupStudent)

router.post('/projects', getProjects)

module.exports = router