const {User} = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class Controller {

    static async register (req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }
            const registered = await User.create(payload)
            res.status(201).json({
                id: registered.id,
                email: registered.email
            }) 
        }
        catch(err) {
            next(err)
        }
    }

    static async login (req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }
            const loggedUser = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if(!loggedUser || !comparePassword(payload.password, loggedUser.password)){
                let err = {
                    name: 'Authentication failed'
                }
                throw next(err)
            }
            else{
                const access_token = signToken({
                    id: loggedUser.id,
                    email: loggedUser.email
                }) 
                res.status(201).json({access_token})
            }
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = Controller