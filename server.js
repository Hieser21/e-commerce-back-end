require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const users = require('./routes/users')
const products = require('./routes/products')
const orders = require('./routes/orders')
const contacts = require('./routes/contacts')
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
