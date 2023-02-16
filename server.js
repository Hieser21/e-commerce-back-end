require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const users = require('./routes/users')
const products = require('./routes/products')
const orders = require('./routes/orders')
const contacts = require('./routes/contacts')


let mongodbURL = process.env.MONGO || 'mongodb://localhost/e-commerce';

const url = mongodbURL

const app = express()

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const con = mongoose.connection
con.on('open', () => {
    console.log('connected to db')
})

app.use(express.json())
app.use(cors());
app.use('/uploads', express.static("uploads"))
app.use('/users', users)
app.use('/products', products)
app.use('/orders', orders)
app.use('/contacts', contacts)

app.listen(process.env.PORT || 9000, () => {
    console.log('server started')
})
