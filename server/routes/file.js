const express = require("express")
const filestack = require("filestack-js")
const multer = require("multer")
const streamifier = require("streamifier")
const cors = require("cors")
const corsOptions = {
    origin: "https://prosys-client.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    // exposedHeaders: ["Authorization"],
    maxAge: 86400,
}

const upload = multer({
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
})
const router = require("express").Router()

const client = filestack.init(process.env.FILESTACK_API_KEY)

router.post("/upload", cors(corsOptions), upload.single("file"), async (req, res) => {
    const { buffer } = req.file
    // const stream = streamifier.createReadStream(buffer)
    console.log(buffer)
    try {
        const response = await client.upload(buffer)
        console.log(response)
        res.json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
