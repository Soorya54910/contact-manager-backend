const express = require('express')
const router = express.Router()
const {regitserUser,loginUser,currentUser} = require('../controllers/userController')
const validateToken = require('../middleware/validateToken')

router.post('/register',regitserUser)

router.post('/login',loginUser)

router.get('/current',validateToken,currentUser)

module.exports = router;