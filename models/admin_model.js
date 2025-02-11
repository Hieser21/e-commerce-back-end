import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
})
export default mongoose.model('admin', adminSchema)