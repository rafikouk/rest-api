const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const Users = mongoose.model("User", userSchema)

module.exports = Users