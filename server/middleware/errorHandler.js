function errorHandler (err, req, res, next){
    let status = 500
    let msg = err.name || 'Internal Server Error'
    
    if(err.name === 'SequelizeValidationError'){
        status = 400
        msg = err.errors[0].message
    }
    else if(err.name === 'Not Found'){
        status = 404
        msg = 'Error Not Found'
    }
    else if (err.name === 'Authentication failed'){
        status = 401
        msg = 'Wrong email/password'
    }
    res.status(status).json({msg})
}

module.exports = errorHandler