const jwt = require('jsonwebtoken')
const Client = require('../models/client')


const auth = async (req, res, next) => {
    try {
        const token = req.cookies['Authorization'].replace('Bearer ', '')// looking to the token in the cookies after login
        const decoded = jwt.verify(token, process.env.JWT_SECRET)//validates that token
        const client = await Client.findOne({ _id: decoded._id, 'tokens.token': token }) // finds the associated user

        if (!client) {
            throw new Error('')
        }

        req.token = token
        req.client = client
        next() // Letting the root handler run
    } catch (e) {
        console.log(e);
        res.status(401).send({error: 'Please autheticate'})
    }
}

module.exports = auth