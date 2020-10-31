const router = require('express').Router()
const controller = require('../controllers/user_controllers')


router.post('/register', controller.register)
router.post('/login', controller.login)
router.post('/googleLogin', controller.googleLogin)


module.exports = router