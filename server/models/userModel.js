const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userModel = new Schema({
    email: {type: String, required: true},
    passwordHash: {type: String, required: true}
})

module.exports = mongoose.model(`userModel`, userModel)

