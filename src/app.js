const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mongoose')
const clientRouter = require('./routers/client')
const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.json())
app.use(express.static(publicDirectoryPath))
app.use(clientRouter)


app.get('', (req , res) => {
    res.render('index',{

    })
})

module.exports = app