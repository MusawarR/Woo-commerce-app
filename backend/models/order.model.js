const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Complete"],
        default: "Pending"
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"],
        default: "Pending"
    }
})

OrderSchema.path("products").validate(function(products) {
    return products.length > 0
}, "Order must contain at least one product")

module.exports = mongoose.model("Order", OrderSchema)