const express = require("express")
const filestack = require("filestack-js")
const multer = require("multer")
const streamifier = require("streamifier")
const upload = multer({
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
})
const router = require("express").Router()

const client = filestack.init(process.env.FILESTACK_API_KEY)

router.post("/upload", upload.single("file"), async (req, res) => {
    const { buffer, originalname } = req.file
    const stream = streamifier.createReadStream(buffer)
    try {
        const response = await client.upload(stream, { filename: originalname })
        res.json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
