const router = require('express').Router()
const controller = require('../controllers/server_controllers')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)
router.post('/', controller.addTodo)
router.get('/', controller.viewAll)
router.get('/my-task', controller.viewById) //blm

router.put('/edit/:id', authorization, controller.replaceById)
router.patch('/update/:id', authorization, controller.updateTodo) // blm
router.delete('/delete/:id', authorization, controller.deleteTodo)

module.exports = router