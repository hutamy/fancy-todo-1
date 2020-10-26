const { urlencoded } = require('express')
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/index')


app.use(express.urlencoded({extended:true}))

app.use(express.json())

app.use('/todos', routes)

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})