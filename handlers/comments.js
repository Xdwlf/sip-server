const db = require('../models')

const getAllComments = async function(req, res, next){
    try{
        const comments = await db.Comment.find({drinkId: req.params.drink_id}).populate("user", {
            username: true,
            profileImgUrl: true
        });
        return res.status(200).json(comments)
    } catch(err){
        return next(err)
    }
}

const createComment = async function(req, res, next){
    try{    
        const comment = await db.Comment.create({text: req.body.text,
            user: req.body.user,
            drinkId: req.params.drink_id,
            rating: req.body.rating
        })
        const foundUser = await db.User.findById(req.body.user)
        foundUser.comments.push(comment.id)
        await foundUser.save()
        let foundComment = await db.Comment.findById(comment.id).populate("user", {
            username: true,
            profileImgUrl: true
        })
        return res.status(200).json(foundComment)
    } catch(err){
        return next(err)
    }
}

const getComment = async function(req, res, next){
    try{
        const foundComment = await db.Comment.findById(req.params.comment_id).populate("user", {
            username: true,
            profileImgUrl: true
        })
        return res.status(200).json(foundComment)
    } catch(err){
        return next(err)
    }
}

const editComment = async function(req, res, next){
    try{
        const updatedComment = await db.Comment.findOneAndUpdate({_id: req.params.comment_id},
            {text: req.body.text,
            rating: req.body.rating},
            {new: true}).populate("user", {
                username: true,
                profileImgUrl: true
            })
        return res.status(200).json(updatedComment)
    } catch(err){
        next(err)
    }
}

const deleteComment = async function(req, res, next){
    try{
        const deletedComment = await db.Comment.findById(req.params.comment_id)
        deletedComment.remove()
        return res.status(200).json(deletedComment)
    } catch(err){
        next(err)
    }
}

const commentHandlers = {
    getAllComments,
    createComment,
    getComment,
    editComment,
    deleteComment
}

module.exports = commentHandlers