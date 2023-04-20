const express = require("express")

// controller
const {
    signupProf,
    loginProf,
    getProfs,
    dissmissProf,
    appointHOD,
    updateProfile,
    getName,
    getProf,
    hodAccept,
    hodReject,
    getHoDApprovalApplications,
} = require("../controllers/profController")

const router = express.Router()

// login
router.post("/login", loginProf)

// signup
router.post("/signup", signupProf)

router.get("/", getProfs)

router.get("/:id", getProf)

router.post("/dissmiss", dissmissProf)

router.post("/appoint", appointHOD)

router.put("/:id", updateProfile)

router.post("/hodaccept/:id", hodAccept)

router.post("/hodreject/:id", hodReject)

router.get("/approve/:id", getHoDApprovalApplications)
// router.get("/:id", getName)

module.exports = router
