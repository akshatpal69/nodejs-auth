// const { application } = require("express")
const express = require("express")
const router = express.Router()
const validateCookies = require('./validateCookies')
// const connection = require("../database")
router.use(validateCookies)



router.post("/", async (req, res) => {
    return res.status(200).json({ response: 'testRoute' })
})


module.exports = router