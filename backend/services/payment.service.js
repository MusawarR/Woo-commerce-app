const { getOrderAmount, updateOrderStatus } = require("./order.service")
const stripe = require("stripe")(process.env.STRIPE_SEC_KEY)

const generatePaymentIntent = async (req, res) => {
    try {
        const orderAmount = await getOrderAmount(req.body.orderId)
        if(orderAmount == null) {
            return res.sendStatus(500)
        }
        
        const newPaymentIntent = await stripe.paymentIntents.create({
            currency: "usd",
            amount: orderAmount * 100,
            automatic_payment_methods: {
                enabled: true
            },
            metadata: {
                orderId: req.body.orderId
            }
        })

        return res.status(200).send(newPaymentIntent.client_secret)
    }
    catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

const handleStripePaymentEvent = async (req, res) => {
    try {
        const event = req.body

        switch(event.type) {
            case "payment_intent.succeeded":
                const { orderId } = event.data.object.metadata
                await updateOrderStatus(orderId, "Complete")
                break
            default:
                console.log(`Unhandled event type: ${event.type}`)
                break
        }

        return res.status(200).json({ received: true })
    }
    catch(err) {
        console.error(err)
        return res.status(200).json({ received: true })
    }
}

module.exports = {
    generatePaymentIntent,
    handleStripePaymentEvent
}