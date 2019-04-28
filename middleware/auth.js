require('dotenv').config();
const jwt = require('jsonwebtoken')

exports.loginRequired = function(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(decoded) return next()
            else return next({
                status: 401,
                message: "Please log in first."
            })
        });
    } catch(err){
        return next({
            status: 401,
            message: "Please log in first."
        })
    }
}

exports.authorizeCurrentUser = function(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(decoded && decoded.id === req.body.user) return next()
            else return next({
                status: 401,
                message: "You are not authorized to do that."
            })
        });
    }catch(err){
        return next({
            status: 401,
            message: "You are not authorized to do that."
        })
    }
}
