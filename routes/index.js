const router = require('express').Router()
const user = require('./user_routes')
const server = require('./server_routes')
const movie = require('../controllers/movies')

router.use('/', user)
router.use('/todos', server)
router.use('/popular-movies', movie.popularMovie)

module.exports = router