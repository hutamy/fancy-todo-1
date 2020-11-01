const {User} = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class Controller {

    static async register (req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password,
                full_name: req.body.full_name
            }
            const registered = await User.create(payload)
            const access_token = signToken({
                id: registered.id,
                email: registered.email,
                full_name: registered.full_name
            }) 
            res.status(201).json({access_token, full_name: payload.full_name})
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
                    name: 'WrongEmailPassword'
                }
                throw next(err)
            }
            else{
                const access_token = signToken({
                    id: loggedUser.id,
                    email: loggedUser.email,
                    full_name: loggedUser.full_name
                }) 
                res.status(201).json({access_token, full_name: loggedUser.full_name})
            }
        }
        catch(err) {
            next(err)
        }
    }

    static async googleLogin (req, res, next) {
        console.log('click')
       
        let {google_access_token} = req.body //ini ambil token yang digenerate google lewat ajax
        const client = new OAuth2Client(process.env.CLIENT_ID)
        async function verify(){
            const ticket = await client.verifyIdToken({
                idToken:google_access_token,
                audience:process.env.CLIENT_ID
            })
            const payload = ticket.getPayload()
            let findUser = await User.findOne({where:{email:payload.email}})

            if(findUser){
                let access_token =  signToken({id:findUser.id,email:findUser.email,full_name:findUser.full_name})
                res.status(200).json({access_token, full_name:findUser.full_name})
            }
            else{
                //asumsi login pakai id google tidak bisa pakai password emailnya
                let newData = {
                    email:payload.email,
                    password:'udahadaaaaa',
                    full_name: payload.name
                }
                let createUser = await User.create(newData)
                let access_token =  signToken({id:createUser.id,email:createUser.email, full_name:createUser.full_name})
                // console.log(acc)
                res.status(200).json({access_token, full_name: createUser.full_name})
            }
        }
        verify().catch(console.error)
    }
    
}

module.exports = Controller