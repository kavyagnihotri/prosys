const express = require("express")

// controller
const {
    signupProf,
    loginProf,
    getProfs,
    dissmissProf,
    appointHOD,
    updateProfile,
    getProf,
    hodAccept,
    hodReject,
    getHoDApprovalApplications,
} = require("../controllers/profController")

const { deleteApplications } = require("../controllers/applicationController")

const router = express.Router()

// login
router.post("/login", loginProf)
router.post("/signup", signupProf)

router.get("/", getProfs)
router.get("/:id", getProf)

router.post("/dissmiss", dissmissProf)
router.post("/appoint", appointHOD)

router.put("/:id", updateProfile)

router.post("/hodaccept/:id", hodAccept)
router.post("/hodreject/:id", hodReject)

// applications
router.get("/approve/:id", getHoDApprovalApplications)
router.delete("/deleteApplications/:id", deleteApplications)

module.exports = router
