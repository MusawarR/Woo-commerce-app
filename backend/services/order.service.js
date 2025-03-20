const OrderModel = require("../models/order.model")
const ProductModel = require("../models/product.model")

const getAllOrders = async (_, res) => {
    try {
        const allOrders = await OrderModel
            .find({})
            .lean()
        
        return res.status(200).send(allOrders)
    }
    catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

const getAllOrdersOfUser = async (req, res) => {
    try {
        const allOrdersOfUser = await OrderModel
            .find({
                user: req.user._id
            })
            .populate("products", "name price image")
            .lean()
        
        return res.status(200).send(allOrdersOfUser)
    }
    catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

const createOrder = async (req, res) => {
    try {
        const products = await ProductModel.find({
            "_id": { $in: req.body.products }
        })

        const totalPrice = products.reduce((total, product) => {
            const productPrice = product.price
            return total + productPrice
        }, 0)

        const newOrder = await OrderModel.create({
            user: req.user._id,
            products: req.body.products,
            totalPrice
        })
        
        const populatedOrder = await newOrder.populate("products", "name price")
        return res.status(201).send(populatedOrder)
    }
    catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

const getOrderAmount = async (orderId) => {
    try {
        const order = await OrderModel.findById(orderId)
        return order.totalPrice
    }
    catch(err) {
        console.error(err)
        return null
    }
}

const updateOrderStatus = async (orderId, newStatus) => {
    try {
        const order = await OrderModel.findById(orderId)
        order.paymentStatus = newStatus
        await order.save()

        return order.paymentStatus
    }
    catch(err) {
        console.error(err)
        return null
    }
}

module.exports = {
    getAllOrders,
    getAllOrdersOfUser,
    createOrder,
    getOrderAmount,
    updateOrderStatus
}