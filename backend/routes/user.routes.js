const express = require("express")
const auth = require("../middleware/auth.middleware")
const { getAllUsers, registerUser, loginUser } = require("../services/user.service")
const router = express.Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users
 *     description: This endpoint is protected and can only be accessed by an ADMIN. It returns a list of all registered users in the system, excluding sensitive fields such as `__v`.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   email:
 *                     type: string
 *       403:
 *         description: Forbidden. User is not authorized to access this resource.
 *       500:
 *         description: Internal server error.
 */
router.get("/", auth("ADMIN"), getAllUsers)

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows a new user to register. The user needs to provide an `email` and `password`. The password is hashed before storing it in the database. If the email is already registered, a conflict response (409) is returned.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully registered.
 *       400:
 *         description: Bad request. Missing email or password.
 *       409:
 *         description: Conflict. Email already registered.
 *       500:
 *         description: Internal server error.
 */
router.post("/register", registerUser)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login an existing user
 *     description: This endpoint allows a registered user to log in using their email and password. On successful login, an authentication token is returned. If the email or password is incorrect, a 404 or 401 status is returned.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully logged in. Returns authentication tokens (access and refresh).
 *       401:
 *         description: Unauthorized. Incorrect email or password.
 *       404:
 *         description: User not found. Email does not exist.
 *       500:
 *         description: Internal server error.
 */
router.post("/login", loginUser)

module.exports = router