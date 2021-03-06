const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImgUrl: {
        type: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    favoriteDrinks: [{
        type: String
    }]
})

userSchema.pre("save", async function(next){
    try{
        if(!this.isModified('password')){
            return next()
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword
        return next()
    } catch(e){
        return next(e)
    }
})

userSchema.methods.comparePassword = async function(candidatePassword, next){
    try{
        let isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch(e){
        return next(e)
    }
}

module.exports = mongoose.model("User", userSchema)