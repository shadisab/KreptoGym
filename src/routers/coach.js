const express = require('express')
const Coach = require('../models/coach')
const { authCoach } =  require('../middleware/auth')
const router = new express.Router()

// Sign up
router.post('/coachs/signup', async (req, res) => {
    const coach = new Coach(req.body)
    try {
        await coach.save()
        const token = await coach.generateAuthToken()
       // res.cookie('Authorization', `Bearer ${token}`); // Save the token to cookies
        res.status(201).send({ coach, token })
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})


// Login
router.post('/coachs/login', async (req, res) => {
    try {
        // Self Created findByCredntials() , generateAuthToken()
        const coach = await Coach.findByCredentials(req.body.email, req.body.password)
        const token = await coach.generateAuthToken()
        res.send({ coach, token })
    } catch (e) {
        res.status(400).send()
    }
})

//Single logout from specific auth token
router.post('/coachs/logout', authCoach, async (req, res) => {
    try {
        req.coach.tokens = req.coach.tokens.filter((token) => {
            return token.token !== req.token //if return is false than it going to remove by filter
        })
        await req.coach.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//logout from all sessions (from all auth tokens that are loged in for real time) for a specific user
router.post('/coachs/logoutAll', authCoach, async (req, res) => {
    try {
        req.coach.tokens = []
        await req.coach.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// GET Coach profile
router.get('/coachs/myProfile', authCoach, async (req, res) => {
   res.send(req.coach)

})


// GET all coaches
router.get('/coachs/allCoachs', authCoach, async (req, res) => {
    const coachs = await Coach.find()
    res.send(coachs)

})


// Update user data
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

// Delete Me
router.delete('/coachs/myProfile', authCoach, async (req, res) => {
    try {
        await req.coach.remove()
        sendCancelEmail(req.coach.email, req.coach.name)
        res.send(req.coach)
    } catch (e) {
        res.status(500).send(e)
    }
})
module.exports = router