const express = require('express')
const router = express.Router({mergeParams:true});
const {loginRequired, authorizeCurrentUser} = require('../middleware/auth')

const {getAllComments,
        createComment,
        getComment,
        editComment,
        deleteComment} = require('../handlers/comments')


//get all comments for certain drink

router.route('/')
        .get(getAllComments)
        .post(loginRequired, createComment)

router.route('/:comment_id')
        .get(loginRequired, authorizeCurrentUser, getComment)
        .put(loginRequired, authorizeCurrentUser, editComment)
        .delete(loginRequired, authorizeCurrentUser, deleteComment)

module.exports = router;