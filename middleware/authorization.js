const { Todo } = require('../models/index')

function authorization (req, res, next){
    const id = +req.params.id
    Todo.findByPk(id)
    .then(data => {
        if(!data) { 
            throw { msg: 'Todo not found', status: 404}
        }
        else if(data.UserId === req.loggedInUser.id){
            next()
        }
        else{
            throw { msg: 'Not authorized', status: 401}
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
}

module.exports = authorization