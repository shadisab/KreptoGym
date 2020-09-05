const express = require('express')
const Client = require('../models/client')
const auth = require('../middleware/auth')
const router = new express.Router()

// Sign up
router.post('/clients/signup', async (req, res) => {
    const client = new Client(req.body)
    try {
        await client.save()
        const token = await client.generateAuthToken()
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
        // To delete the returned user data (for security) we have thos two methods
        //First
        // res.send({ user: user.getPublicProfile(), token })
        //second (BUT in user.js models we change the name of the upper function to .toJSON method)
        res.send({ client, token })
    } catch (e) {
        res.status(400).send()
    }
})

//Single logout from specific auth token
router.post('/clients/logout', auth, async (req, res) => {
    try {
        req.client.tokens = req.client.tokens.filter((token) => {
            return token.token !== req.token //if return is false than it going to remove by filter
        })
        await req.client.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//logout from all sessions (from all auth tokens that are loged in for real time) for a specific user
router.post('/clients/logoutAll', auth, async (req, res) => {
    try {
        req.client.tokens = []
        await req.client.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/clients/myProfile', auth, async (req, res) => {
    res.send(req.client)

})



router.patch('/clients/myProfile', auth, async (req, res) => {

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

router.delete('/clients/myProfile', auth, async (req, res) => {
    try {
        await req.client.remove()
        sendCancelEmail(req.client.email, req.client.name)
        res.send(req.client)
    } catch (e) {
        res.status(500).send(e)
    }
})
module.exports = router