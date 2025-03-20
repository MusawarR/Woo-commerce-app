require("dotenv").config()

const connectDB = require("./config/mongo.config")
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./swagger.config")
const server = express()

const userRouter = require("./routes/user.routes")
const productRouter = require("./routes/product.routes")
const orderRouter = require("./routes/order.routes")
const paymentRouter = require("./routes/payment.routes")

connectDB()

const PORT = process.env.PORT || 4534

server.use(express.json({ limit: "10mb" }))
server.use(express.urlencoded({ extended: true, limit: "10mb" }))
server.use(cors())
server.use(morgan("short"))

server.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
server.use("/api/users", userRouter)
server.use("/api/products", productRouter)
server.use("/api/orders", orderRouter)
server.use("/api/payments", paymentRouter)

server.listen(PORT, () => {
    console.debug(`[SERVER]: Server is running on port: ${PORT}`)
})