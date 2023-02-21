const express = require('express')

// controller fucntion
const {signupStudent, loginStudent } = require('../controllers/studentController')

const router = express.Router()

// login route
router.post('/login', loginStudent)

// singup route
router.post('/signup', signupStudent)

module.exports = router