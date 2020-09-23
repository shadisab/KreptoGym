const jwt = require('jsonwebtoken');
const Client = require('../models/client');
const Coach = require('../models/coach');


const authClient = async (req, res, next) => {
	try {
		const token = req.cookies['Authorization'].replace('Bearer ', '');// looking to the token in the cookies after login
		//const token = req.header('Authorization').replace('Bearer ', '')
		const decoded = jwt.verify(token, process.env.JWT_SECRET);//validates that token
		const client = await Client.findOne({ _id: decoded._id, 'tokens.token': token }); // finds the associated user

		if (!client) {
			throw new Error('');
		}

		req.token = token;
		req.client = client;
		next(); // Letting the root handler run
	} catch (e) {
		res.status(401).send('<!DOCTYPE html><html><head><title>401</title><link rel="stylesheet" href="/css/404.css"></head><body><div class="Main-DIV"><div class="msg-404">401 <p class="msg-err">You are not Authorized</p></div><p class="msg-err">Please press the back button to return to the previous page</p></div></body></html>');
	}
};


const authCoach = async (req, res, next) => {
	try {
		const token = req.cookies['Authorization'].replace('Bearer ', '');// looking to the token in the cookies after login
		//const token = req.header('Authorization').replace('Bearer ', '')
		const decoded = jwt.verify(token, process.env.JWT_SECRET);//validates that token
		const coach = await Coach.findOne({ _id: decoded._id, 'tokens.token': token }); // finds the associated user
		if (!coach) {
			throw new Error('');
		}
		req.token = token;
		req.coach = coach;
		next(); // Letting the root handler run
	} catch (e) {
		res.status(401).send('<!DOCTYPE html><html><head><title>401</title><link rel="stylesheet" href="/css/404.css"></head><body><div class="Main-DIV"><div class="msg-404">401 <p class="msg-err">You are not Authorized</p></div><p class="msg-err">Please press the back button to return to the previous page</p></div></body></html>');
	}
};
module.exports = {authClient, authCoach};