const mongoose = require("mongoose")
const bcrpyt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const studentSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    studentID: {
        // verify valid id
        type: String,
        required: true,
        unique: true,
    },
    dept: {
        // dropdown
        type: String,
        required: true,
    },
    cgpa: {
        // bw 0.0 and 10.0
        type: Number,
        required: true,
    },
    cv_link: {
        // upload cvlink
        type: String,
        required: true,
        unique: true,
    },
    per_link: {
        type: String,
        // required: true,
        unique: true,
    },
    aoi: {
        // area of interset
        type: String,
        required: true,
    },
    notify: {
        type: Number,
        required: true,
    },
})

// static signup method
studentSchema.statics.signup = async function (email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi) {
    // validation
    if (!email || !password || !name || !studentID || !dept || !cv_link || !per_link || !aoi) {
        throw Error("All fields must exist")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }

    const regex = new RegExp("[fhp][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9].*")
    if (!regex.test(email)) {
        throw Error("Email must belong to a student. Hint: starts with f, h, or p")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }

    if (!validator.isURL(cv_link)) {
        throw Error("Not a valid URL for CV")
    }

    if (!validator.isURL(per_link)) {
        throw Error("Not a valid URL for Performance Sheets")
    }

    // unique
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error("Email already in use")
    }

    // hashing password
    const salt = await bcrpyt.genSalt(10)
    const hash = await bcrpyt.hash(password, salt)

    const student = await this.create({ email, password: hash, name, studentID, dept, cgpa, cv_link, per_link, aoi })

    return student
}

// static login method
// studentSchema.statics.login = async function(email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi) {
studentSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must filled")
    }

    const student = await this.findOne({ email })
    if (!student) {
        throw Error("Incorrect email")
    }

    const match = await bcrpyt.compare(password, student.password)

    if (!match) {
        throw Error("Incorrect password")
    }

    return student
}

module.exports = mongoose.model("Student", studentSchema)

// email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi
