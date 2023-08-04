import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import users from './routes/users.js'
import products from './routes/products.js'
import orders from './routes/orders.js'
import contacts from './routes/contacts.js'
const app = express()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

app.use(express.json())
app.use(cors());
app.use('/uploads', express.static("uploads"))
app.use('/users', users)
app.use('/products', products)
app.use('/orders', orders)
app.use('/contacts', contacts)


connectDB().then(() => {
    app.listen(9000, () => {
        console.log("listening for requests");
    })
})
