const express = require('express')

// controller
const { signupProf, loginProf , getProfs } = require('../controllers/profController')

const router = express.Router()

// login
router.post('/login', loginProf)

// signup
router.post('/signup', signupProf)

router.post('/', getProfs)

module.exports = router