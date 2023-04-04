const express = require("express")

// controller fucntion
const { signupStudent, loginStudent, getStudents } = require("../controllers/studentController")
const { getProjects, getProject } = require("../controllers/projectController")
const {
    getApplications,
    createApplication,
    deleteApplication,
    addScore,
    getInformal,
    updateStatus,
} = require("../controllers/applicationController")

const router = express.Router()

// login route
router.post("/login", loginStudent)

// singup route
router.post("/signup", signupStudent)

const requireAuth = require("../middleware/requireAuth")
router.use(requireAuth)

// Projects
router.get("/projects", getProjects)
router.get("/projects/:id", getProject)

// Applications
router.get("/applications", getApplications)
router.post("/createApplication", createApplication)
router.post("/score", addScore)
router.get("/infrank", getInformal)
router.post("/status", updateStatus)

router.get("/", getStudents)
// router.delete('/applications/:id', deleteApplication)
// router.patch('/:id', updateProject)

module.exports = router
