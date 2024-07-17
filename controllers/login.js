const jwt = require("jsonwebtoken")
const router = require("express").Router()

const { SECRET } = require("../utils/config")
const { User, Session } = require("../models")
const { tokenExtractor, auth } = require("../utils/middleware")

router.post("/", async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username,
        },
    })
    const passwordCorrect = req.body.password === "secret"
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            Error: "Invalid credentials",
        })
    }
    if (user.disabled) {
        return res.status(403).json({ Error: "Account has been disabled" })
    }
    const userForToken = {
        username: user.username,
        id: user.id,
    }
    const token = jwt.sign(userForToken, SECRET)
    const session = await user.createSession()
    res.status(200).send({
        token: token,
        sid: session.sid,
        username: user.username,
        name: user.name,
    })
})

router.delete("/", tokenExtractor, auth, async (req, res) => {
    await Session.update({ valid: false }, { where: { userId: req.user.id } })
    req.user = null
    req.decodedToken = null
    res.sendStatus(200)
})

module.exports = router
