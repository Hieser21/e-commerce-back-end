import express from 'express'
const router = express.Router()
import products from '../models/product_model.js'
import fs from 'fs'
import multer from 'multer'
import chokidar from 'chokidar'

import UploadProvider from './upload-provider.js'
const provider = new UploadProvider()

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



router.post('/addproduct', upload.single('image'), (req, res) => {
  let final = req.file.path.split('/').join('%2F')
    const product = new products({
        productname: req.body.productname,
        description: req.body.description,
        price: req.body.price,
        image: final,
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

    products.findOneAndDelete({ productname: productname })
        .then(prds => {
            fs.unlink(prds.image);
            res.json("Done")
            
        })
        .catch(err => {
            res.json("err" + err)
        })

})

export default router
