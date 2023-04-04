const express = require("express")
const cors = require("cors")
const filestack = require("filestack-js")
const streamifier = require("streamifier")
const multer = require("multer")
const { clientURL } = require("../../client/src/utils/constants")
const router = express.Router()
const upload = multer({
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
})

const client = filestack.init(process.env.FILESTACK_API_KEY)

const corsOptions = {
    origin: clientURL, // Replace with your client-side domain
}

router.post("/upload", cors(corsOptions), upload.single("file"), async (req, res) => {
    // create a readable stream from the file buffer
    console.log(req.file.buffer)
    const stream = streamifier.createReadStream(req.file.buffer)
    client
        .upload(stream)
        .then((response) => {
            console.log(response.url)
            res.json(response)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
})

module.exports = router
