const express = require("express")

// controller function
const { getGlobals, updateStatus } = require("../controllers/globalStatesController")

const router = express.Router()

router.get("/getglobals", getGlobals)

router.post("/updateglobals", updateStatus)

module.exports = router
