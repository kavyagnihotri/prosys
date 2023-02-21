const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const profSchema = new Schema({
  email: { type: String, unique: true },
  name: String,
  password: String,
  dept: String,
  chamber: String,
  researchInterest: String,
  websites: String,
  hod: Boolean,
})

// email, password, name, dept, chamber, researchInterest, websites, hod

// static signup
profSchema.statics.signup = async function (email, password, name, dept, chamber, researchInterest, websites, hod) {

    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    const exists = await this.findOne({ email })
    
    if(exists) {
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const prof = await this.create({email, password: hash, name, dept, chamber, researchInterest, websites, hod})
    return prof    
}

module.exports = mongoose.model('Prof', profSchema)