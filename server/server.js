require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

// express app
const app = express()
const projectRoutes = require("./routes/projects")
const studentRoutes = require("./routes/student")
const augsdRoutes = require("./routes/augsd")
const profRoutes = require("./routes/prof")
const fileRoutes = require("./routes/file")
const globalStatus = require("./routes/globalStates")

// middleware
app.use(express.json())

app.use(cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// routes
app.use("/projects", projectRoutes)
app.use("/student", studentRoutes)
app.use("/augsd", augsdRoutes)
app.use("/prof", profRoutes)
app.use("/file", fileRoutes)
app.use("/globals", globalStatus)

// db connect and listen for requests
mongoose.set("strictQuery", false)
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
    })
    .then(() => {
        app.listen(process.env.PORT, () => {})
    })
    .catch((error) => {})

//Chat API is used here onwards
app.use(cors({ origin: true }))
const axios = require("axios")

app.post("/authenticate", async (req, res) => {
    const { username } = req.body
    // Get or create user on Chat Engine!
    console.log("username = " + username)
    try {
        const r = await axios.put(
            "https://api.chatengine.io/users/",
            { username: username, secret: username, first_name: username },
            { headers: { "Private-Key": "66fb706d-7c8c-4c26-8edc-49dd33ea1038" } }
        )
        return res.status(r.status).json(r.data)
    } catch (e) {
        return res.status(e.response.status).json(e.response.data)
    }
})
