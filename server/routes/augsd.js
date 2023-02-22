const express = require('express')

// controller fucntion
const { loginAugsd } = require('../controllers/augsdController')

const router = express.Router()

// login route
router.post('/login', loginAugsd)


module.exports = router