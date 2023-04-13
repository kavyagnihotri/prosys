const mongoose = require("mongoose")
const Schema = mongoose.Schema

const globalStatesModel = new Schema({
    email: {
        type: String,
        required: true,
    },
    applicationStatus: {
        type: Boolean,
    },
})

module.exports = mongoose.model("globalState", globalStatesModel)
