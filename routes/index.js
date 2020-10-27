const router = require('express').Router()
const user = require('./user_routes')
const server = require('./server_routes')

router.use('/', user)
router.use('/todos', server)

module.exports(router)