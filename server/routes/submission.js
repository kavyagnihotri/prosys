const express = require('express')

// controller function
const {
    getOneSubmission,
    getAllProjectSubmissions,
    getAllStudentSubmission,
    createSubmission
} = require('../controllers/submissionController')

const router = express.Router()

router.get('/student/:id', getAllStudentSubmission)

router.get('/project', getAllProjectSubmissions)

router.post('/', getOneSubmission)

router.put('/student', createSubmission)

module.exports = router