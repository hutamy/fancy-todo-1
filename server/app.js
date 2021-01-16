if(process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/index')
const errorHandler = require('./middleware/errorHandler')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(routes)
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})