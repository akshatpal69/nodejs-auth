let mysql = require("mysql2")
const ENV = require("./env.js")

let connection = mysql.createConnection({
  host: ENV.SERVER_IP,
  port: ENV.DB_PORT,
  user: ENV.DB_USER,
  password: ENV.DB_PASS,
  database: ENV.DB_NAME,
})

connection.connect(function (err) {
  if (err) {
    if (err.fatal == true) {
      console.log(`FATAL ERROR ${err.message}`)
      console.log(
        `tried connection with ${ENV.SERVER_IP} at port ${ENV.DB_PORT} with database ${ENV.DB_NAME}`
      )
      console.log(`MYSQL SERVER NOT REACHABLE`)
    } else {
      console.log(`error:  ${err.code} ${err.message}`)
    }
  } else {
    console.log(
      `Connected to ${ENV.SERVER_IP} at port ${ENV.DB_PORT} with database ${ENV.DB_NAME}`
    )
  }
})


module.exports = connection
