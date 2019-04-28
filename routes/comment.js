const express = require('express')
const router = express.Router({mergeParams:true});
const {getAllComments,
        createComment,
        getComment,
        editComment,
        deleteComment} = require('../handlers/comments')


//get all comments for certain drink

router.route('/')
        .get(getAllComments)
        .post(createComment)

router.route('/:comment_id')
        .get(getComment)
        .put(editComment)
        .delete(deleteComment)

module.exports = router;