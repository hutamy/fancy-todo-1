const router = require('express').Router()
const controller = require('../controllers/server_controllers')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)
router.post('/', controller.addTodo)
router.get('/', controller.viewAllTodos)
router.get('/my-task', controller.viewAllByUserId)


router.get('/:id', authorization ,controller.findTodoById)
router.put('/:id', authorization, controller.replaceById) 
router.patch('/:id', authorization, controller.updateTodo) 
router.delete('/:id', authorization, controller.deleteTodo) 

module.exports = router