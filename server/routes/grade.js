const express = require('express')

// controller function
const {
    getOneGrade,
    getAllProjectGrade,
    getAllStudentGrade,
    updateMidsemGrade,
    updateCompreGrade
} = require('../controllers/gradeController')

const router = express.Router()

router.get('/student/:id', getAllStudentGrade)

router.post('/project', getAllProjectGrade)

router.post('/', getOneGrade)

router.post('/student/midsem', updateMidsemGrade)

router.post('/student/compre', updateCompreGrade)

module.exports = router