const {Todo} = require('../models/index')

class Controller {

    static async addTodo (req, res, next) {

        try {
            const payload = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status || false,
                due_date: req.body.due_date,
                UserId: req.loggedInUser.id
            }
            const todo = await Todo.create(payload)
            res.status(201).json(todo)
        }
        catch(err){
            next(err)
        }
    }


    static async viewAll (req,res, next){

        try {
            const todos = await Todo.findAll({
                where: {
                    UserId: req.loggedInUser.id
                }
            })
            res.status(200).json(todos)
        }
        catch(err) {
            next(err)
        }
    }


    static async viewById (req, res, next) {
        
        try {
            const id = +req.params.id
            const selectedTodo = await Todo.findByPk(id)
            res.status(200).json(selectedTodo)
        }
        catch(err) {
            next(err)
        }
    }


    static async replaceById(req,res, next) {

        try {
            const id = +req.params.id
            const payload = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            const updatedTodo = await Todo.update(payload, {
                where: {
                    id: id
                }
            })
            if(!updatedTodo){
                let err = {
                    name: 'Not Found'
                }
                throw next(err)
            }
            else {
                res.status(200).json(updatedTodo)
            }
        }
        catch(err) {
            next(err)
        }
    }


    static async updateTodo (req, res, next){

        try {
            const id = +req.params.id
            const payload = {
                status: req.body.status
            }

            const updatedTodo = await Todo.update(payload, {
                where: {
                    id: id
                }
            })
            if(!updatedTodo){
                let err = {
                    name: 'Not Found'
                }
                throw next(err)
            }
            else {
                res.status(200).json(updatedTodo)
            }
        }
        catch(err) {
            next(err)
        }
    }
    

    static async deleteTodo(req, res, next) {
        try {
            const id = +req.params.id
            const deletedTodo = await Todo.destroy({
                where:{
                    id: id
                }
            })
            if(!updatedTodo){
                let err = {
                    name: 'Not Found'
                }
                throw next(err)
            }
            else {
                res.status(200).json({message: 'Todo sucess to delete'})
            }
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = Controller