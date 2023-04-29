const mongoose = require("mongoose")
const bcrpyt = require("bcryptjs")

const Schema = mongoose.Schema

const augsdSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

augsdSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must filled")
    }
    const augsd = await this.findOne({ email })
    if (!augsd) {
        throw Error("Incorrect email")
    }
    let match = await bcrpyt.compare(password, augsd.password)
    if (!match) {
        throw Error("Incorrect password")
    }
    return augsd
}
module.exports = mongoose.model("augsd", augsdSchema)
