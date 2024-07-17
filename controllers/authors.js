const router = require("express").Router()
const { Blog } = require("../models")
const { Sequelize } = require("sequelize")

router.get("/", async (req, res) => {
    const authorStats = await Blog.findAll({
        attributes: [
            "author",
            [Sequelize.fn("COUNT", "*"), "articles"],
            [Sequelize.fn("SUM", Sequelize.col("likes")), "likes"],
        ],
        group: ["author"],
        order: [['likes', 'DESC']]
    })
    res.json(authorStats)
})


module.exports = router
