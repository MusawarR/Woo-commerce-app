const jwt = require("jsonwebtoken")

const generateAccessAndRefreshTokens = async (userId, userEmail, userRole) => {
    try {
        const accessToken = jwt.sign(
            {
                _id: userId,
                email: userEmail,
                role: userRole
            },
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: "2d"
            }
        )
            
        return accessToken
    }
    catch(err) {
        throw err
    }
}

module.exports = {
    generateAccessAndRefreshTokens
}