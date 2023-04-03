const express = require("express")
const filestack = require("filestack-js")
const multer = require("multer")
const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
})
const router = require("express").Router()

const client = filestack.init(process.env.FILESTACK_API_KEY)

router.post("/upload", upload.single("file"), (req, res) => {
    const { path } = req.file
    client
        .upload(path)
        .then((response) => {
            // console.log(response.url)
            res.json(response)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
})

module.exports = router
