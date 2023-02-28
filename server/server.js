require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');  

// express app
const app = express();
const projectRoutes = require('./routes/projects')
const studentRoutes = require('./routes/student')
const augsdRoutes = require('./routes/augsd')
const profRoutes = require('./routes/prof')

// middleware
// app.use(bodyParser())
app.use(express.json())
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
// app.use(bodyParser.json())

// app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use('/projects', projectRoutes)
app.use('/student', studentRoutes)
app.use('/augsd',augsdRoutes)
app.use('/prof', profRoutes)

// db connect and listen for reqs
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,}) 
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB\nListening on port", process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })