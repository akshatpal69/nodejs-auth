const express = require("express")
const app = express()
const cors = require("cors")
// const path = require("path")
let morgan = require("morgan")
const authRoute = require("./routes/auth")
const testroute = require("./routes/test")
const testroute2 = require("./routes/test2")

//middleware
app.use(morgan("dev"))
app.use(cors({ origin: "*" }))
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/test", testroute)
app.use("/api/test2", testroute2)
// app.use("/", express.static(path.join(__dirname, "public")))


app.listen(80, () => {
  console.log("app running on http://localhost:80")
})
