const {Todo} = require('../models/index')

class Controller {

    static addTodo (req, res) {

        const value = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        
        Todo.create(value)
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(err => {
            if(err.name === 'SequelizeValidationError'){
                const errors = err.name.map (el=> {
                    return el.message
                })
                res.status(400).json(errors)
            }
            else {
                res.status(500).json(err)
            }
        })
    }


    static viewAll (req,res){

        Todo.findAll()
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }


    static viewById (req, res) {

        const id = +req.params.id
        Todo.findByPk({
            where: {
                id: id
            }
        })
        .then(selectedTodo => {
            res.status(200).json(selectedTodo)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }


    static replaceById(req,res) {

        const id = +req.params.id
        const value = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(value, {
            where: {
                id: id
            }
        })
        .then(updatedTodo => {
            if(!updatedTodo){
                res.status(404).json({message: 'Error Not Found'})
            }
            res.status(200).json(updatedTodo)
        })
        .catch(err => {
            if(err.name === 'SequelizeValidationError'){
                const errors = err.name.map (el=> {
                    return el.message
                })
                res.status(400).json(errors)
            }
            else{
                res.status(500).json(err)
            }
        })
    }


    static updateTodo (req, res){

        const id = +req.params.id
        const value = {status: req.body.status}
        Todo.update(value, {
            where: {
                id: id
            }
        })
        .then(updatedTodo => {
            if(!updatedTodo){
                res.status(404).json({message: 'Error Not Found'})
            }
            res.status(200).json(updatedTodo)
        })
        .catch(err => {
            if(err.name === 'SequelizeValidationError'){
                const errors = err.name.map (el=> {
                    return el.message
                })
                res.status(400).json(errors)
            }
            else{
                res.status(500).json(err)
            }
        })
    }
    

    static deleteTodo(req, res) {
        const id = +req.params.id
        Todo.destroy({
            where:{
                id: id
            }
        })
        .then(deletedTodo => {
            if(!deletedTodo){
                res.status(404).json({message: 'Error Not Found'})
            }
            else{
                res.status(200).json({message: 'Todo sucess to delete'})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = Controller