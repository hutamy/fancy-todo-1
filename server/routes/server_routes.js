const router = require('express').Router()
const controller = require('../controllers/server_controllers')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')


router.use(authentication)
router.post('/', controller.addTodo)
router.get('/', controller.viewAll)
router.get('/:id', controller.viewById)


router.use(authorization)
router.put('/:id', controller.replaceById)
router.patch('/:id', controller.updateTodo)
router.delete('/:id', controller.deleteTodo)


module.exports = router