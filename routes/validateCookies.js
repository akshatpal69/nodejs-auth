const connection = require("../database")

async function validateCookies(req, res, next) {
    if (!req.headers.cookie) {
        return res.status(400).json({ result: 'NOtLogged in' })
    } else {
        let biscuits = {}
        const biscuitsArray = req.headers.cookie.split(';')
        biscuitsArray.forEach((biscuit) => {
            const [key, value] = biscuit.trim().split('=')
            biscuits[key] = value
        })
        receivedSessionID = Object.values(biscuits)[0]
        let sessionExistsCheckQuery = `select empid from empsessions where sessionid="${receivedSessionID}"`
        connection.query(sessionExistsCheckQuery, function (err, result) {
            if (err) return res.status(401).json({ error: err })
            if (result.length < 0) {
                return res.status(401).json({ error: 'sessionDoesntExists' })
            }
        })
    }
    next()
}
module.exports = validateCookies