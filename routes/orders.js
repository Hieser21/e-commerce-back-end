import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const router = express.Router()
import orders from '../models/order_model.js'
import Stripe from 'stripe'


let stripeKey = process.env.STRIPE

const stripe = new Stripe(stripeKey)


router.put('/neworder', (req, res) => {

    const { username, email, address, productnames, price } = req.body

    const order = new orders({
        username, email, address, productnames, price
    })

    order.save()
        .then(savedOrder => {
            res.json('saved')
        })
        .catch(err => {
            res.json("error" + err)
        })

})

router.post('/payment', async (req, res) => {
    const { amount } = req.body

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'inr'
        })
        res.status(200).send(paymentIntent.client_secret)
    } catch (err) {
        res.status(500).send(err)
    }

})


router.post('/allorders', (req, res) => {

    const { email } = req.body

    orders.find({ email: email })
        .then(allOrder => {
            res.json(allOrder)
        })
        .catch(err => {
            res.json("error" + err)
        })

})

router.get('/orders', (req, res) => {

    orders.find()
        .then(allOrder => {
            res.json(allOrder)
        })
        .catch(err => {
            res.json("error" + err)
        })

})

router.put('/orderstatus', (req, res) => {

    const { status, date, email } = req.body

    orders.updateOne({ date: date, email: email }, { status: status })
        .then(order => {
            res.json('updated')
        })
        .catch(err => {
            res.json("error" + err)
        })

})

export default router