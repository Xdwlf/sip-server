const mongoose = require('mongoose')
const User = require('./user')

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    drinkId : {
        type: String,
        required: true
    }
}, {timestamps: true})

commentSchema.pre('remove', async function(next){
    try{
        let user = await User.findById(this.user)
        user.comments.remove(this.id)
        await user.save();
        return next()
    }catch(e){
        next(e)
    }
})

module.exports = mongoose.model("Comment", commentSchema)