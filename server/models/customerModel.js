const mongoose = require('mongoose');
const Schema = mongoose.Schema

const customerModel = new Schema({
    name: {type: String, required: true}
})

module.exports = mongoose.model(`customerModel`, customerModel)

