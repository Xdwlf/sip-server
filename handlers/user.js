const db = require('../models')

exports.getUser = async function(req, res, next){
    try{
        db.User.findById(req.params.user_id).populate('comments').exec((err,user )=>{
            const {comments, email, favoriteDrinks, username, profileImgUrl} = user
            return res.status(200).json({comments, email, favoriteDrinks, username, profileImgUrl})
        })
    }catch(err){
        next(err)
    }
}
