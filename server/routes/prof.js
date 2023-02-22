const express = require('express')

// controller
const { signupProf, loginProf } = require('../controllers/profController')

const router = express.Router()

// login
router.post('/login', loginProf)

// signup
router.post('/signup', signupProf)

module.exports = router