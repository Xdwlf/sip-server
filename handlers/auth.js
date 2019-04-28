const db = require('../models')
const jwt = require('jsonwebtoken')

const signin = async function(req, res, next){
    try{
        let user = await db.User.findOne({email: req.body.email})
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            const tokenedData = tokenizeUser(user)
            return res.status(200).json(tokenedData)
        }else{
            return next({
                status: 400,
                message: "Invalid Email/Password"
            })
        }
    } catch(err){
        return next({
            status: 400,
            message: "Invalid Email/Password"
        })
    }
}

const signup = async function(req, res, next){
    try {
        //request body should be an object with necessary keys
        //email, password, username, ?profile pic
        let user = await db.User.create(req.body)
        const tokenedData = tokenizeUser(user)
        return res.status(200).json(tokenedData)
    } catch(err){
        if(err.code === 1100){
            err.message = "Sorry, that username/email is taken."
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}

const tokenizeUser = function(user){
    let {id, username, email, profileImgUrl} = user;
    let token = jwt.sign({
        id,
        username,
        email
    }, process.env.SECRET_KEY);
    return {
        id,
        username,
        email,
        profileImgUrl,
        token
    }
}

exports.signup = signup
exports.signin = signin