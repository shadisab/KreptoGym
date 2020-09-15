const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mongoose')
const clientRouter = require('./routers/client')
const coachRouter = require('./routers/coach')
const app = express()
const cookie = require('cookie-parser')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(cookie())
app.use(express.json())
app.use(express.static(publicDirectoryPath))
app.use(clientRouter)
app.use(coachRouter)

app.get('', (req , res) => {
    res.render('index')
})



app.get('/clientRegister', (req , res) => {
    res.render('clientRegister',{

    })
})


app.get('/coachRegister' , (req , res) => {
    res.render('coachRegister')
})

app.get('/coachLogin', (req , res) => {
    res.render('coachLogin',{

    })
})

app.get('/clientLogin', (req , res) => {
    res.render('clientLogin',{

    })
})

app.get('/about', (req , res) => {
    res.render('about',{

    })
})

app.get('/help', (req , res) => {
    res.render('help',{

    })
})

app.get('/clientHome' , (req , res) => {
    res.render('clientHome')
})

app.get('/coachClients' , (req , res) => {
    res.render('coachClients')
})

app.get('/coachScheduleUpdate' , (req , res) => {
    res.render('coachScheduleUpdate')
})

app.get('/clientSchedule' , (req , res) => {
    res.render('clientSchedule')
})

app.get('/coachClients' , (req , res) => {
    res.render('coachClients')
})

app.get('/clientProfile' , (req , res) => {
    res.render('clientProfile')
})

app.get('/coachProfile' , (req , res) => {
    res.render('coachProfile')
})

app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        message: 'Page not found!',
        name: 'Wisam Halabi'
    })
})
module.exports = app