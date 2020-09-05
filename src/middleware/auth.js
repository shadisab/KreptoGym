const jwt = require('jsonwebtoken')
const Client = require('../models/client')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')//looking for the header that the user is supposed to provide
        const decoded = jwt.verify(token, process.env.JWT_SECRET)//validates that header
        const client = await Client.findOne({ _id: decoded._id, 'tokens.token': token }) // finds the associated user

        if (!client) {
            throw new Error('')
        }

        req.token = token
        req.client = client
        next() // Letting the root handler run
    } catch (e) {
        res.status(401).send({error: 'Please autheticate'})
    }
}

module.exports = auth