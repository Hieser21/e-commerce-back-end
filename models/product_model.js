const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },

})
module.exports = mongoose.model('product', productSchema)
