const express = require('express')
const router = express.Router({mergeParams:true});
const {getUser} = require('../handlers/user')

router.get('/', getUser)


module.exports = router;