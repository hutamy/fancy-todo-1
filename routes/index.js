const router = require('express').Router()
const controller = require('../controllers/index')


router.post('/', controller.addTodo)
router.get('/', controller.viewAll)
router.get('/:id', controller.viewById)
router.put('/:id', controller.replaceById)
router.patch('/:id', controller.updateTodo)
router.delete('/:id', controller.deleteTodo)


module.exports = router