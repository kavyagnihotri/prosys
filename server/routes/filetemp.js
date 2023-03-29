const filestack = require("filestack-js")
const multer = require("multer")
const upload = multer()
const router = require("express").Router()
const mongoose = require("mongoose")
const streamifier = require("streamifier")

const client = filestack.init(process.env.FILESTACK_API_KEY)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const fileSchema = new mongoose.Schema({
    filename: String,
    mimetype: String,
    size: Number,
    url: String,
})

const File = mongoose.model("File", fileSchema)

router.post("/upload", upload.single("file"), (req, res) => {
    const stream = streamifier.createReadStream(req.file.buffer)
    client
        .upload(stream)
        .then((response) => {
            const { filename, mimetype, size, url } = response
            const file = new File({ filename, mimetype, size, url })
            return file.save()
        })
        .then((file) => {
            res.json(file)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
})

module.exports = router
