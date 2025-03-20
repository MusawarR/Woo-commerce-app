const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.middleware")
const { generatePaymentIntent, handleStripePaymentEvent } = require("../services/payment.service")

router.post("/intent", auth(), generatePaymentIntent)
router.post("/webhook", handleStripePaymentEvent)

module.exports = router