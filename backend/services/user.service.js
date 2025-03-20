const bcrypt = require("bcrypt")
const UserModel = require("../models/user.model")
const { generateAccessAndRefreshTokens } = require("../utils/token.util")

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await UserModel
            .find({})
            .select("-__v")
            .lean()

        return res.status(200).send(allUsers)
    }
    catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

const registerUser = async (req, res) => {
    try {
        if(!req.body?.email || !req?.body.password) {
            return res.status(400).send("Email and Password, both are required")
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const newUser = await UserModel.create({
            email: req.body.email,
            password: hashedPassword
        })

        const authToken = await generateAccessAndRefreshTokens(newUser._id, newUser.email, newUser.role)
        return res.status(200).send({
            token: authToken,
            role: newUser.role
        })
    }
    catch(err) {
        if(err.code === 11000) {
            return res.sendStatus(409)
        }

        console.error(err)
        return res.sendStatus(500)
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email
        })

        if(!user) {
            return res.status(404).send("Email or password is incorrect")
        }

        const passwordMatches = await bcrypt.compare(req.body.password, user.password)

        if(passwordMatches) {
            const authToken = await generateAccessAndRefreshTokens(user._id, user.email, user.role)
            return res.status(200).send({
                token: authToken,
                role: user.role
            })
        }

        return res.status(401).send("Email or password is incorrect")
    }
    catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

module.exports = {
    getAllUsers,
    registerUser,
    loginUser
}