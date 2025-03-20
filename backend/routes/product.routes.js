const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.middleware")
const { getAllProducts, addProduct, editProduct, deleteProduct } = require("../services/product.service")

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of all products
 *     description: This endpoint retrieves all products from the database, excluding sensitive fields like `__v`.
 *     responses:
 *       200:
 *         description: A list of all products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   image:
 *                     type: string
 *       500:
 *         description: Internal server error.
 */
router.get("/", getAllProducts)

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     description: This endpoint allows an ADMIN to add a new product. The product must include a `name`, `price`, and an `image` URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product successfully added.
 *       403:
 *         description: Forbidden. Only ADMIN can add products.
 *       500:
 *         description: Internal server error.
 */
router.post("/", auth("ADMIN"), addProduct)

/**
 * @swagger
 * /products/{productId}:
 *   patch:
 *     summary: Edit an existing product
 *     description: This endpoint allows an ADMIN to edit an existing product. If the product is part of an order, the edit will be rejected with a 409 conflict status.
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: The ID of the product to edit.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product successfully edited.
 *       400:
 *         description: Bad request. Invalid product data.
 *       404:
 *         description: Product not found.
 *       409:
 *         description: Conflict. The product cannot be edited because it is part of an existing order.
 *       403:
 *         description: Forbidden. Only ADMIN can edit products.
 *       500:
 *         description: Internal server error.
 */
router.patch("/:productId", auth("ADMIN"), editProduct)

/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     summary: Delete a product
 *     description: This endpoint allows an ADMIN to delete a product. If the product is part of an order, the deletion will be rejected with a 409 conflict status.
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: The ID of the product to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product successfully deleted.
 *       404:
 *         description: Product not found.
 *       409:
 *         description: Conflict. The product cannot be deleted because it is part of an existing order.
 *       403:
 *         description: Forbidden. Only ADMIN can delete products.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:productId", auth("ADMIN"), deleteProduct)

module.exports = router