require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// express app
const app = express();
const projectRoutes = require('./routes/projects')
const studentRoutes = require('./routes/student')

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// bodyParser.urlencoded({ extended: false })

// routes
app.use('/projects', projectRoutes)
app.use('/student', studentRoutes)

// db connect and listen for reqs
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL) 
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB\nListening on port", process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })