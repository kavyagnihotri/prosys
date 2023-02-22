const mongoose = require('mongoose')
const bcrpyt = require('bcryptjs')

const Schema = mongoose.Schema

const augsdSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
    }
})


augsdSchema.statics.login = async function(email, password) {   
    if(!email || !password) {
        throw Error('All fields must filled')
    }
    console.log("IN FUNCTION")

    // if(email == "kav@gmail.com" && password=="kav") {
    //     console.log("acce[ted");
    // }
    
    const augsd = await this.findOne({ email })
    console.log("KUCH HOGAYAA HAI ")
    console.log(augsd)
   
    if(!augsd) {
        // console.log("KUCH hogayaaA HAI ")
        throw Error('Incorrect email')
    }

    console.log("KUCH TOH HUA HAI ")
    match = await bcrpyt.compare(password, augsd.password)
    console.log(match)
    if(!match) {
        console.log("oops")
        throw Error('Incorrect password')
    }
    else
        console.log('Found match')
    return augsd
}

module.exports = mongoose.model('augsd', augsdSchema)