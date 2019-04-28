require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const errorHandler = require('./handlers/error')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const commentRoutes = require('./routes/comment')
const PORT = process.env.PORT || 8081

app.use(cors())
app.use(bodyParser.json())

//Routes
app.use("/api/auth", authRoutes)
app.use("/api/user/:id", userRoutes)
app.use("/api/drinks/:id/comments", commentRoutes)

//If no routes are reached
app.use(function(req,res, next){
    let err = new Error("Not Found")
    err.status = 404
    return next(err)
})

app.use(errorHandler)

app.listen(PORT, function(){
    console.log(`Server has started on port ${PORT}`)
})