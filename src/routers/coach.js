const express = require('express')
const Coach = require('../models/coach')
const Client = require('../models/client')
const { authCoach } = require('../middleware/auth')
const router = new express.Router()

// Sign up
router.post('/coachs/signup', async (req, res) => {
    const coach = new Coach(req.body)
    try {
        await coach.save()
        const token = await coach.generateAuthToken()
        res.cookie('Authorization', `Bearer ${token}`); // Save the token to cookies
        res.status(201).send({ coach, token })
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message)
    }
})


// Login
router.post('/coachs/login', async (req, res) => {
    try {
        // Self Created findByCredntials() , generateAuthToken()
        const coach = await Coach.findByCredentials(req.body.email, req.body.password)
        const token = await coach.generateAuthToken()
        res.cookie('Authorization', `Bearer ${token}`); // Save the token to cookies
        res.send({ coach, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//Single logout from specific login coach
router.post('/coachs/logout', authCoach, async (req, res) => {
    try {
        req.coach.tokens = req.coach.tokens.filter((token) => {
            return token.token !== req.token //if return is false than it going to remove by filter
        })
        await req.coach.save()
        await res.clearCookie('Authorization');
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//logout from all sessions (from all auth tokens that are loged in for real time) for a specific coach
router.post('/coachs/logoutAll', authCoach, async (req, res) => {
    try {
        req.coach.tokens = []
        await req.coach.save()
        await res.clearCookie('Authorization');
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Updating Nutrition for a client
router.patch('/coachs/client/nutrition/:id', authCoach, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowerdUpdates = ['protine', 'carbs', 'fats', 'notes']
    const isValidOperation = updates.every((update) => allowerdUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // bypassed more advanced features like middleware which means that if we want to use them consistently
        // So "User.findByIdAndUpdate" will not work
        const client = await Client.findOne({_id: req.params.id,coachID: req.coach._id })
        if (!client) {
            return res.status(404).send("Cant Find client")
        }
        updates.forEach((update) => client.nutrition[update] = req.body[update])// Dynamic update  
        await client.save()

        res.send(req.client.nutrition)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

// GET Coach profile
router.get('/coachs/myProfile', authCoach, async (req, res) => {
    res.send(req.coach)

})

// Update Coach profile data
router.patch('/coachs/myProfile', authCoach, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowerdUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowerdUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // bypassed more advanced features like middleware which means that if we want to use them consistently
        // So "User.findByIdAndUpdate" will not work 
        updates.forEach((update) => req.coach[update] = req.body[update])// Dynamic update  
        await req.coach.save()

        res.send(req.coach)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET all Claints of this coach 
router.get('/coaches/myClients', authCoach, (req, res) => {
   //get array of id's of all clients that this coach is train
  res.send(req.coach.myClients)
})
module.exports = router