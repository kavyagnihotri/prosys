const express = require("express")
const {
    createProject,
    getProjects,
    getProject,
    deleteProject,
    getApprovedProjects,
    getPendingProjects,
    updateFormalProjectStatus,
    updateInformalProjectStatus,
} = require("../controllers/projectController")
const requireAuth = require("../middleware/requireAuth")

// require auth for all projects
const router = express.Router()

router.use(requireAuth)

router.get("/approvedprojects", getApprovedProjects)

router.get("/pendingprojects", getPendingProjects)

// GET all posts
router.get("/", getProjects)

// GET a single post
router.get("/:id", getProject)

// POST a post
router.post("/", createProject)

// DELETE a post
router.delete("/:id", deleteProject)

// UPDATE a post
router.post("/formal/:id", updateFormalProjectStatus)
router.post("/informal/:id", updateInformalProjectStatus)

module.exports = router
