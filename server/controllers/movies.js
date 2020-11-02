const axios = require('axios')

class Movie {

    static popularMovie (req,res, next) {
        let listMovie
        axios ({
            url: 'https://api.themoviedb.org/3/movie/popular',
            method: 'get',
            headers: {
                Authorization: `Bearer ${process.env.TOKEN_TMDB}`
            }
        })
        .then(movies => {
            listMovie = movies.data.results.map(el =>{
                return {
                  title: el.title,
                  poster_path: 'https://image.tmdb.org/t/p/w342/' + el.poster_path
                }
            })
            res.status(200).json(listMovie)
        })
        .catch (err => {
            next(err)
        })
    } 
}

module.exports = Movie 