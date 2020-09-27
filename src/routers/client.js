const express = require('express');
const Client = require('../models/client');
const Coach = require('../models/coach');
const { authClient } = require('../middleware/auth');
const router = new express.Router();

// Sign up
router.post('/clients/signup', async (req, res) => {
	const client = new Client(req.body);
	try {
		await client.save();
		const token = await client.generateAuthToken();
		const coach = await Coach.findById(req.body.coachID);
		coach.myClients = coach.myClients.concat({
			id: client._id,
			name: client.name,
			age: client.age,
			height: client.height,
			weight: client.weight
		});
		await coach.save();
		res.cookie('Authorization', `Bearer ${token}`); // Save the token to cookies
		res.status(201).send({ client, token });
	} catch (e) {
		res.status(400).send(e);
	}
});


// Login
router.post('/clients/login', async (req, res) => {
	try {
		// Self Created findByCredntials() , generateAuthToken()
		const client = await Client.findByCredentials(req.body.email, req.body.password);
		const token = await client.generateAuthToken();
		res.cookie('Authorization', `Bearer ${token}`);
		res.send({ client, token });
	} catch (e) {
		res.status(400).send(e);
	}
});

//Single logout from specific auth token
router.post('/clients/logout', authClient, async (req, res) => {
	try {
		req.client.tokens = req.client.tokens.filter((token) => {
			return token.token !== req.token; //if return is false than it going to remove by filter
		});
		await req.client.save();
		await res.clearCookie('Authorization');
		res.send(req.client);
	} catch (e) {
		res.status(500).send();
	}
});

// Get client profile data
router.get('/clients/myProfile', authClient, async (req, res) => {
	res.send(req.client);
});
// GET client nutrition data
router.get('/clients/nutrition', authClient, async (req, res) => {
	res.send(req.client.nutrition);
});
//Get client Training schedule
router.get('/clients/training', authClient, async (req, res) => {
	res.send(req.client.trainingSchedule);
});
// GET all coaches
router.get('/clients/allCoachs', async (req, res) => {
	const coachs = await Coach.find();
	res.send(coachs);
});

// Updating client Password
router.patch('/clients/password', authClient, async (req, res) => {
	const allowerdUpdates = 'password';
	try {
		const client = await Client.findByCredentials(req.client.email, req.body.password);
		if(req.body.password === req.body.newPassword ){
			throw new Error('New password must not be the same as old password');
		}
		client[allowerdUpdates] = req.body.newPassword;
		await client.save();
		res.status(200).send(client);
	} catch (e) {
		res.status(400).send(e);
	}
});

// Delete client itself
router.delete('/clients/myProfile', authClient, async (req, res) => {
	try {
		await req.client.remove();
		await res.clearCookie('Authorization');
		res.status(200).send(req.client);
	} catch (e) {
		res.status(500).send(e);
	}
});
module.exports = router;