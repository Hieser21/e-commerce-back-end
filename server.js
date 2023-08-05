import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import users from './routes/users.js'
import products from './routes/products.js'
import orders from './routes/orders.js'
import contacts from './routes/contacts.js'
import chokidar from 'chokidar'
const app = express()
import UploadProvider from './routes/upload-provider.js'
const provider = new UploadProvider()
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const watcher = chokidar.watch('uploads', {
    persistent: true,
    awaitWriteFinish: true,
    cwd: __dirname
})

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
watcher.on('add', path => {console.log(path);
                      provider.upload(path, path)})
  watcher.on('unlink', path => { console.log(path);
                         provider.delete(path)})

connectDB().then(() => {
    app.listen(9000, () => {
        console.log("listening for requests");
    })
})
