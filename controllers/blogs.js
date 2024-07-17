const router = require("express").Router()
const { tokenExtractor, auth } = require("../utils/middleware")
const { Blog, User } = require("../models")
const { Op, Sequelize } = require("sequelize")

router.get("/", async (req, res) => {
    const where = {}
    if (req.query.search) {
        where[Op.or] = [
            { title: { [Op.match]: Sequelize.fn("to_tsquery", req.query.search) } },
            { author: { [Op.match]: Sequelize.fn("to_tsquery", req.query.search) } },
        ]
    }
    const blogs = await Blog.findAll({
        attributes: { exclude: ["userId"] },
        include: {
            model: User,
            attributes: ["name"],
        },
        order: [["likes", "DESC"]],
        where,
    })
    res.json(blogs)
})
router.post("/", tokenExtractor, auth, async (req, res) => {
    const blog = await Blog.create({ ...req.body, userId: req.user.id })
    res.json(blog)
})
const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}
router.delete("/:id", blogFinder, tokenExtractor, auth, async (req, res) => {
    if (req.blog) {
        if (req.blog.userId === req.user.id) {
            await req.blog.destroy()
            res.sendStatus(204)
        } else {
            res.sendStatus(403)
        }
    } else {
        res.sendStatus(404)
    }
})
router.put("/:id", blogFinder, tokenExtractor, auth, async (req, res) => {
    if (!req.user) {
        res.sendStatus(401)
    }
    if (req.blog) {
        if (req.body.likes) {
            req.blog.likes = req.body.likes
            const newBlog = await req.blog.save()
            res.json(newBlog)
        } else {
            throw new Error("Likes missing from request body")
        }
    } else {
        res.sendStatus(404)
    }
})
router.get("/:id", blogFinder, async (req, res) => {
    if (req.blog) {
        res.json(req.blog)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router
