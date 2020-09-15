const express = require('express')
const Client = require('../models/client')
const Coach = require('../models/coach')
const { authClient } = require('../middleware/auth')
const router = new express.Router()

// Sign up
router.post('/clients/signup', async (req, res) => {
    const client = new Client(req.body)
    try {
        await client.save()
        const token = await client.generateAuthToken()
        const coach = await Coach.findById(req.body.coachID)
        coach.myClients = coach.myClients.concat({
            id: client._id,
            name: client.name,
            age: client.age,
            height: client.height,
            weight: client.weight
        })
        await coach.save()
        res.cookie('Authorization', `Bearer ${token}`); // Save the token to cookies
        res.status(201).send({ client, token })
    } catch (e) {
        res.status(400).send(e)
    }
})


// Login
router.post('/clients/login', async (req, res) => {
    try {
        // Self Created findByCredntials() , generateAuthToken()
        const client = await Client.findByCredentials(req.body.email, req.body.password)
        const token = await client.generateAuthToken()
        res.cookie('Authorization', `Bearer ${token}`);
        // To delete the returned user data (for security) we have thos two methods
        //First
        // res.send({ user: user.getPublicProfile(), token })
        //second (BUT in user.js models we change the name of the upper function to .toJSON method)
        res.send({ client, token })
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})

//Single logout from specific auth token
router.post('/clients/logout', authClient, async (req, res) => {
    try {
        req.client.tokens = req.client.tokens.filter((token) => {
            return token.token !== req.token //if return is false than it going to remove by filter
        })
        await req.client.save()
        await res.clearCookie('Authorization');
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//logout from all sessions (from all auth tokens that are loged in for real time) for a specific user
router.post('/clients/logoutAll', authClient, async (req, res) => {
    try {
        req.client.tokens = []
        await req.client.save()
        await res.clearCookie('Authorization');
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Get client profile data
router.get('/clients/myProfile', authClient, async (req, res) => {
    res.send(req.client)

})
// GET all coaches
router.get('/clients/allCoachs', async (req, res) => {
    const coachs = await Coach.find()
    res.send(coachs)

})

/* NOW I USE CHOOSE CLIENT FROM THE SIGNUP */
// Choosing a coach to start trining with from coach list
// router.patch('/clients/chooseCoache', authClient, async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowerdUpdates = ['coachID']
//     const isValidOperation = updates.every((update) => allowerdUpdates.includes(update))
//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }
//     try {
//         // bypassed more advanced features like middleware which means that if we want to use them consistently
//         // So "User.findByIdAndUpdate" will not work 
//         updates.forEach((update) => req.client[update] = req.body[update])// Dynamic update 
//         // Adding ID of the client  to the choosed coach
//         const coach = await Coach.findById(req.body.coachID)
//         coach.myClients = coach.myClients.concat({
//             id: req.client._id,
//             name: req.client.name,
//             age: req.client.age,
//             height: req.client.height,
//             weight: req.client.weight
//         })
//         await req.client.save()
//         await coach.save()
//         res.send(req.client)
//     } catch (e) {
//         console.log(e);
//         res.status(400).send(e)
//     }

// })

// Updating client profile data
router.patch('/clients/myProfile', authClient, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowerdUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowerdUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // bypassed more advanced features like middleware which means that if we want to use them consistently
        // So "User.findByIdAndUpdate" will not work 
        updates.forEach((update) => req.client[update] = req.body[update])// Dynamic update  
        await req.client.save()

        res.send(req.client)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete client itself
router.delete('/clients/myProfile', authClient, async (req, res) => {
    try {
        await req.client.remove()
        res.send(req.client)
    } catch (e) {
        res.status(500).send(e)
    }
})
module.exports = router