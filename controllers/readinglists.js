const router = require("express").Router()
const { tokenExtractor, auth } = require("../utils/middleware")
const { Readinglist } = require("../models")

router.post("/", tokenExtractor, auth, async (req, res) => {
    const read = await Readinglist.create(req.body)
    return read ? res.json(read) : res.sendStatus(400)
})

router.put("/:id", tokenExtractor, auth, async (req, res) => {
    const readinglist = await Readinglist.findByPk(req.params.id)
    if (readinglist) {
        if (readinglist.userId === req.user.id) {
            readinglist.read = req.body.read
            await readinglist.save()
            res.sendStatus(200)
        } else {
            res.sendStatus(403)
        }
    } else {
        res.sendStatus(404)
    }
})

module.exports = router
