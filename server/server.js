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
const globalStatesRoutes = require("./routes/globalStates")
const gradeRoutes = require("./routes/grade")
const submissionRoutes = require("./routes/submission")

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
app.use("/globals", globalStatesRoutes)
app.use("/grade", gradeRoutes)
app.use("/submission", submissionRoutes)

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
            { headers: { "Private-Key": "1654474a-a136-4def-951d-c8c0670bd2b8" } }
        )
        return res.status(r.status).json(r.data)
    } catch (e) {
        return res.status(e.response.status).json(e.response.data)
    }
})
