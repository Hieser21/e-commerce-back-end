import mongoose from 'mongoose'

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
export default mongoose.model('product', productSchema)
