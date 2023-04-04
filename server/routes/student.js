const express = require("express")

// controller function
const { signupStudent, loginStudent, getStudents, getStudent, updateProfile, getName } = require("../controllers/studentController")
const { getProjects, getProject } = require("../controllers/projectController")
const { getApplications, createApplication, deleteApplication } = require("../controllers/applicationController")

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

router.get("/", getStudents)
router.get("/:id", getStudent)

router.put("/:id", updateProfile)

// router.get("/:id", getName)

module.exports = router
