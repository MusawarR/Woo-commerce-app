const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.middleware")
const { getAllOrders, getAllOrdersOfUser, createOrder } = require("../services/order.service")

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: This endpoint allows an authenticated user to retrieve a list of all orders. Only admins can access this data.
 *     responses:
 *       200:
 *         description: A list of all orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user:
 *                     type: string
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         price:
 *                           type: number
 *                   totalPrice:
 *                     type: number
 *       403:
 *         description: Forbidden. Only admins can access this resource.
 *       500:
 *         description: Internal server error.
 */
router.get("/", auth(), getAllOrders)

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: This endpoint allows an authenticated user to create a new order by providing a list of product IDs. The total price is calculated based on the provided products.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Product IDs of the items being ordered.
 *     responses:
 *       201:
 *         description: Order successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 user:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                 totalPrice:
 *                   type: number
 *       400:
 *         description: Bad request. Invalid product IDs or data.
 *       500:
 *         description: Internal server error.
 */
router.post("/", auth(), createOrder)

/**
 * @swagger
 * /orders/users:
 *   get:
 *     summary: Get all orders of the authenticated user
 *     description: This endpoint allows the authenticated user to retrieve all their orders. It populates the product details (name and price) for each product in the order.
 *     responses:
 *       200:
 *         description: A list of orders placed by the authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user:
 *                     type: string
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         price:
 *                           type: number
 *                   totalPrice:
 *                     type: number
 *       500:
 *         description: Internal server error.
 */
router.get("/users", auth(), getAllOrdersOfUser)

module.exports = router