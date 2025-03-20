const jwt = require("jsonwebtoken")

const auth = (...roles) => {
    return async function(req, res, next) {
        try {
            const authHeader = req.headers.authorization
            const bearer = "Bearer "

            if(!authHeader || !authHeader.startsWith(bearer)) {
                return res.sendStatus(401)
            }

            const token = authHeader.replace(bearer, "")
            let decoded = {}

            try {
                decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            }
            catch(_) {
                return res.sendStatus(401)
            }

            if(!decoded) {
                return res.sendStatus(400)
            }
            
            if(roles.length && !roles.includes(decoded.role)) {
                return res.sendStatus(401)
            }

            req.user = decoded

            next()
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = auth