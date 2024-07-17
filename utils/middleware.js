const jwt = require("jsonwebtoken")
const { SECRET } = require("./config")
const { User, Session } = require("../models")

const unknownEndpoint = (request, response) => {
    response.status(404).json({ Error: "Unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.name)
    console.error(error.message)

    if (error.name === "SequelizeValidationError") {
        return response.status(400).json({ Error: error.message })
    } else if (error.message === "Likes missing from request body") {
        return response.status(400).json({ Error: error.message })
    }
    next(error)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch (error) {
            console.log(error)
            return res.status(401).json({ Error: "Token invalid" })
        }
    } else {
        return res.status(401).json({ Error: "Token missing" })
    }
    next()
}

const auth = async (req, res, next) => {
    try {
        const decodedToken = req.decodedToken
        const sid = req.get("Session-ID")

        if (!decodedToken?.id) {
            return res.status(401).json({ Error: "Token missing or invalid" })
        }
        const session = await Session.findOne({ where: { sid: sid, valid: true } })
        const user = await User.findOne({
            include: { model: Session, where: { sid: sid, valid: true } },
        })
        if (!user) {
            return res.status(401).json({ Error: "Not logged in" })
        }
        if (user.sessions.length === 0) {
            return res.status(401).json({ Error: "Not logged in" })
        }
        if (user.disabled) {
            return res.status(401).json({ error: "User disabled" })
        }
        req.user = user
    } catch (Error) {
        next(Error)
    }
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    auth,
}
