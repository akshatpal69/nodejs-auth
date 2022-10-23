const express = require("express")
const router = express.Router()
const connection = require("../database")


/**http://localhost:80/api/auth/login */
router.post("/login", async (req, res) => {
    let { empname, password } = req.body
    if(!empname&&!password){
        return res.status(400).json({response:'noDataReceived'})
    }
    if (!req.headers.cookie) {
        let checkCredentialsQuery = `select empid, empname, password, name from employees where empname ="${empname}"`
        connection.query(checkCredentialsQuery, function (err, result) {
            if (err) return res.status(400).json({ response: err })
            if (result.length > 0) {
                if (password !== result[0].password) {
                    return res.status(400).json({ response: 'wrong password' })
                } else {
                    let sessionid = 'randomString' + empname
                    res.cookie('authBiscuit', sessionid)
                    let saveSessionQuery = `INSERT INTO empsessions (sessionid, empid) VALUES ("${sessionid}", "${result[0].empid}")`
                    connection.query(saveSessionQuery, (err, result) => {
                        if (err) return res.status(400).json({ response:err })
                    })
                    return res.status(200).json({ response:'logged in' })
                }
            } else {
                return res.status(400).json({ response: `wrong empname || emp doesn't exist` })
            }
        })
    }
    else{return res.status(400).json({ response:`can't login again` })}
    // else {
    //     let biscuits = {}
    //     const biscuitsArray = req.headers.cookie.split(';')
    //     biscuitsArray.forEach((biscuit) => {
    //         const [key, value] = biscuit.trim().split('=')
    //         biscuits[key] = value
    //     })
    //     let receivedsessionid = Object.values(biscuits)[0]
    //     // console.log(receivedsessionid)
    //     let verifySessionQuery = `select sessionid from empsessions where sessionid="${receivedsessionid}"`
    //     // console.log(verifySessionQuery)
    //     connection.query(verifySessionQuery, (err, result) => {
    //         if (err) res.status(400).json({ response:err })
    //         if (result.length > 0) {
    //             let getempname = result[0].sessionid.substr(12)
    //             // console.log(getempname)
    //             let checkempOfSessionQuery = `select empname from employee where empname = "${getempname}"`
    //             connection.query(checkempOfSessionQuery, (err, result) => {
    //                 if (err) res.status(400).json({ response:err })
    //                 if (result.length > 0) {
    //                     return res.status(200).json({ response: 'alreadywed' })
    //                 } else {
    //                     res.clearCookie(Object.keys(biscuits))
    //                     return res.status(400).json({ response: 'empDoesntExistAnymore' })
    //                 }
    //             })
    //         } else {
    //             res.clearCookie(Object.keys(biscuits))
    //             return res.status(200).json({ response: 'redirectTrue' })
    //         }
    //     })
    // }
})


router.get('/logout', (req, res, next) => {
    if (!req.headers.cookie) {
        return res.status(200).json({ response: 'alredyloggedOut' })
    } if(req.headers.cookie) {
        let biscuits = {}
        const biscuitsArray = req.headers.cookie.split(';')
        biscuitsArray.forEach((biscuit) => {
            const [key, value] = biscuit.trim().split('=')
            biscuits[key] = value
        })
        // console.log(biscuits.authBiscuit)
        res.clearCookie(Object.keys(biscuits))
        let clearSessionQuery = `delete from empsessions where sessionid = "${biscuits.authBiscuit}"`
        connection.query(clearSessionQuery, function (err, result) {
            if(err) return res.status(200).json({ response: 'loggedOutNow' })
        })
        return res.status(200).json({ response: 'loggedOutNow' })
    }else{
        return res.status(400).json({ response: 'err'})
    }
})


module.exports = router