const express = require('express')

// controller fucntion
const { loginAugsd, acceptProject, rejectProject } = require('../controllers/augsdController')

const router = express.Router()

// login route
router.post('/login', loginAugsd)

router.post('/accept', acceptProject)

router.post('/reject',rejectProject)


module.exports = router