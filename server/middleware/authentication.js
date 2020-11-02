const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/index')

async function authentication (req, res, next){
    
    const { access_token } = req.headers

    try{
        if(!access_token) {
            throw next(err)
        }
        else{
            const decoded = verifyToken(access_token)
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            if(!user){
                let err = {
                    name: 'Authentication failed'
                }
                throw next(err)
            }
            else {
                req.loggedInUser = decoded
                console.log('authentic')
                next ()
            }
        }
    }
    catch(err) {
        next(err)
    }
}

module.exports = authentication