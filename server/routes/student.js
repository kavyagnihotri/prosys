const express = require("express")

// controller function
const {
    signupStudent,
    loginStudent,
    getStudents,
    getStudent,
    updateProfile,
} = require("../controllers/studentController")
const { getProjects, getProject } = require("../controllers/projectController")
const {
    getApplications,
    createApplication,
    addScore,
    getRanked,
    updateStatus,
    acceptApplication,
    rejectApplication,
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
router.get("/rank", getRanked)
router.post("/status", updateStatus)
router.post("/accept", acceptApplication)
router.post("/reject", rejectApplication)
router.delete("/applications/:id", deleteApplication)

router.get("/", getStudents)
router.get("/:id", getStudent)
router.put("/:id", updateProfile)

module.exports = router
