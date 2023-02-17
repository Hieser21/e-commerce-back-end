const express = require('express')
const router = express.Router()
const products = require('../models/product_model')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/')
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

    const product = new products({
        productname: req.body.productname,
        description: req.body.description,
        price: req.body.price,
        image: req.file.path,
        type: req.body.type
    })

    product.save()
        .then(savedproduct => {
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

    products.findOneAndDelete({ productname: productname })
        .then(prds => {
            res.json("Done")
        })
        .catch(err => {
            res.json("err" + err)
        })

})

module.exports = router
