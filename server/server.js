require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

// express app
const app = express()
const projectRoutes = require("./routes/projects")
const studentRoutes = require("./routes/student")
const augsdRoutes = require("./routes/augsd")
const profRoutes = require("./routes/prof")

// middleware
// app.use(bodyParser())
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    next()
})
// app.use(bodyParser.json())

// app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use("/projects", projectRoutes)
app.use("/student", studentRoutes)
app.use("/augsd", augsdRoutes)
app.use("/prof", profRoutes)

// db connect and listen for reqs
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
            { headers: { "Private-Key": "bd81780d-7af4-4add-be57-7bcdd870fbb5" } }
        )
        return res.status(r.status).json(r.data)
    } catch (e) {
        return res.status(e.response.status).json(e.response.data)
    }
})
