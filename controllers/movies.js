const axios = require('axios')

class Movie {

    static popularMovie (req,res, next) {
        axios ({
            url: 'https://api.themoviedb.org/3/movie/popular',
            method: 'get',
            headers: {
                Authorization: `Bearer ${process.env.TOKEN_TMDB}`
            }
        })
        .then(({data}) => {
            console.log(data.results)
            res.status(200).json(data.results)
        })
        .catch (err => {
            next(err)
        })
    } 
}

module.exports = Movie 