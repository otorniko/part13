const router = require("express").Router()
const { User, Blog } = require("../models")
const { tokenExtractor, auth } = require("../utils/middleware")

router.get("/", async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
            model: Blog,
            attributes: { exclude: ["userId"] },
        },
    })
    res.json(users)
})
router.post("/", async (req, res) => {
    if (req.body) {
        const user = await User.create(req.body)
        res.json(user)
    } else {
        res.sendStatus(400)
    }
})
router.put("/:username", tokenExtractor, auth, async (req, res) => {
    if (req.params.username === req.user.username) {
        req.user.username = req.body.username
        const savedUser = await req.user.save()
        res.json(savedUser)
    } else {
        res.sendStatus(403)
    }
})
router.get("/:id", async (req, res) => {
    const where = {}

    if (req.query.read) {
        where.read = req.query.read === "true"
    }
    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ["id", "created_at", "updated_at"] },
        include: [
            {
                model: Blog,
                as: "blogs",
                attributes: { exclude: ["userId", "created_at", "updated_at"] },
            },
            {
                model: Blog,
                as: "reading",
                attributes: { exclude: ["userId", "created_at", "updated_at"] },
                through: {
                    where,
                    attributes: { exclude: ["userId", "blogId"] },
                },
            },
        ],
    })
    res.json(user)
})

module.exports = router
