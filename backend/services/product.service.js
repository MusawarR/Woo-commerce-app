const ProductModel = require("../models/product.model")
const OrderModel = require("../models/order.model")

const getAllProducts = async (_, res) => {
    try {
        const allProducts = await ProductModel
            .find({})
            .select("-__v")
            .lean()

        return res.status(200).send(allProducts)
    }
    catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

const addProduct = async (req, res) => {
    try {
        await ProductModel.create({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
        })

        return res.sendStatus(201)
    }
    catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

const editProduct = async (req, res) => {
    try {
        const product = await ProductModel
            .findById(req.params.productId)

        if(!product) {
            return res.sendStatus(404)
        }

        const ordersWithProduct = await OrderModel.find({
            products: req.params.productId
        })

        if(ordersWithProduct && ordersWithProduct.length > 0) {
            return res.sendStatus(409)
        }

        Object.assign(product, req.body)
        await product.save()

        return res.status(200).send(product)
    }
    catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await ProductModel
            .findById(req.params.productId)
        
        if(!product) {
            return res.sendStatus(404)
        }

        const ordersWithProduct = await OrderModel.find({
            products: req.params.productId
        })

        if(ordersWithProduct && ordersWithProduct.length > 0) {
            return res.sendStatus(409)
        }

        await product.deleteOne()

        return res.sendStatus(200)
    }
    catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

module.exports = {
    getAllProducts,
    addProduct,
    editProduct,
    deleteProduct
}