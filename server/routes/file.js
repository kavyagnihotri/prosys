const { clientURL } = require("../../client/src/utils/constants")

const express = require("express")
const filestack = require("filestack-js")
const multer = require("multer")
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
})
const cors = require("cors")
const router = require("express").Router()

const client = filestack.init(process.env.FILESTACK_API_KEY)

router.post("/upload", cors({ origin: clientURL }), upload.single("file"), (req, res) => {
    const { buffer } = req.file
    client
        .upload(buffer)
        .then((response) => {
            console.log(response.url)
            res.json(response)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
})

module.exports = router
