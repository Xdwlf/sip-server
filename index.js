require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const {loginRequired, authorizeCurrentUser} = require('./middleware/auth')
const errorHandler = require('./handlers/errors')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const commentRoutes = require('./routes/comment')
const PORT = process.env.PORT || 8081

app.use(cors())
app.use(bodyParser.json())

//Routes
app.use("/api/auth", authRoutes)
app.use("/api/drinks/:drink_id/comments", commentRoutes)
app.use("/api/user/:user_id", /*loginRequired, authorizeCurrentUser, */userRoutes)


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