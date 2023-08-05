import express from 'express'
const router = express.Router()
import products from '../models/product_model.js'
import fs from 'fs'
import multer from 'multer'
import chokidar from 'chokidar'
import path from 'path'
import { fileURLToPath } from 'url';
import UploadProvider from './upload-provider.js'
const provider = new UploadProvider()
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const watcher = chokidar.watch('uploads', {
    persistent: true,
    awaitWriteFinish: true,
    cwd: __dirname
})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5
    }
})

watcher
  .on('add', path => {console.log(path);
                      provider.upload(path, path)})
  .on('unlink', path => { console.log(path);
                         provider.delete(path)})

router.post('/addproduct', upload.single('image'), (req, res) => {

    const product = new products({
        productname: req.body.productname,
        description: req.body.description,
        price: req.body.price,
        image: req.file.path,
        type: req.body.type
    })
    
    product.save()
        .then(savedproduct => {
            console.log(savedproduct)
            res.json(savedproduct)
        })
        .catch(err => {
            res.json("err" + err)
        })

  
    
})


router.get('/getproducts', (req, res) => {

    products.find()
        .then(prds => {
            res.json(prds)
        })
        .catch(err => {
            res.json("err" + err)
        })

})


router.post('/deleteproduct', (req, res) => {

    const { productname } = req.body;
    products.find({productname: productname}).then(docs => {
        fs.unlink(docs.image)
    })
    products.findOneAndDelete({ productname: productname })
        .then(prds => {
            res.json("Done")
            
        })
        .catch(err => {
            res.json("err" + err)
        })

})

export default router
