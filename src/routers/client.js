const express = require('express');
const Client = require('../models/client');
const Coach = require('../models/coach');
const { authClient } = require('../middleware/auth');
const router = new express.Router();
const { sendmsg } = require('../db/Mails');
const multer = require('multer');
const sharp = require('sharp');

const updates = ['name', 'birthDate', 'height', 'weight', 'country', 'gender'];

const upload = multer({
	limits: { fileSize: 2000000 },
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|PNG|png)$/)) {
			return cb(new Error('Please upload a image'));
		}
		cb(undefined, true);
	}
});

router.post('/ClientsCoachesCheck', async (req, res) => {
	try {
		const client = await Client.findOne({ email: req.body.email });
		const coach = await Coach.findOne({  email: req.body.email });
		if(!client && !coach) res.status(200).send('OK');
		else throw new Error('Used email address');
	} catch (error) {
		res.status(409).send(error.message); // Email already exists
	}
});
// Sign up
router.post('/clients/signup', upload.single('upload'), async (req, res) => {
	const client = new Client(req.body);
	if(req.file){
		const buffer = await sharp(req.file.buffer).resize({ width:250 ,height:250 }).png().toBuffer(); //output from sharp
		client.profilePic = buffer;
	}
	try {
		const coach = await Coach.findById(req.body.coachID);
		if(!coach){
			throw new Error('Cant finde coach');
		}
		const token = await client.generateAuthToken();
		await client.save();
		sendmsg(client.email, `Welcome ${client.name}`, 'We wish you have a great day, we sent a message to your chosen coach, let us know if you' + 'didn\'t' + 'receive any update in the next 3 days.');
		sendmsg(coach.email, `A new client request form ${client.name}`, `Hey ${coach.name}, you got a new client request, please check your account.`);
		res.cookie('Authorization', `Bearer ${token}`); // Save the token to cookies
		res.status(201).send({ client, token });
	} catch (e) {
		console.log(e);
		res.status(400).send(e.message);
	}
});


// Login
router.post('/usersLogin', async (req, res) => {
	try {
		// Self Created findByCredntials() , generateAuthToken()
		let token = undefined;
		let client = await Client.findOne({ email: req.body.email });
		let coach = await Coach.findOne({  email: req.body.email });
	
		if(client){
			client = await Client.findByCredentials(req.body.email, req.body.password);
			token = await client.generateAuthToken();
			res.cookie('Authorization', `Bearer ${token}`);
			res.status(200).send({ client, token });

		} else if(coach){
			coach = await Coach.findByCredentials(req.body.email, req.body.password);
			token = await coach.generateAuthToken();
			res.cookie('Authorization', `Bearer ${token}`);
			res.status(200).send({coach, token });
		} 
		else throw new Error('Wrong login');
	} catch (e) {
		console.log(e);
		res.status(400).send(e.message);
	}
});


//User check valid room  TBD
// router.get('/validroom', async(req, res) =>{
// 	if()
// });

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
	return res.status(200).send(req.client);
});

router.get('/clients/training', authClient, async (req, res) => {
	return res.status(200).send(req.client.trainingSchedule);
});

// GET all coaches
router.get('/clients/allCoachs', async (req, res) => {
	const coachs = await Coach.find({ status: 'Accepted' });
	res.send(coachs);
});

// Updating client Password
router.patch('/clients/password', authClient, async (req, res) => {
	const allowerdUpdates = 'password';
	try {
		const client = await Client.findByCredentials(req.client.email, req.body.password);
		if (req.body.password === req.body.newPassword) {
			throw new Error('New password must not be the same as old password');
		}
		client[allowerdUpdates] = req.body.newPassword;
		await client.save();
		res.status(200).send(client);
	} catch (e) {
		res.status(400).send(e);
	}
});

// Updating Client details
// router.patch('/client/editProfile', upload.single('upload'), authClient, async (req, res) => {
	
// 	const client = await Client.findById(req.client._id);
	
// 	if(req.file){
// 		const buffer = await sharp(req.file.buffer).resize({ width:250 ,height:250 }).png().toBuffer(); //output from sharp
// 		client.profilePic = buffer;
// 	}
// 	try {
// 		req.body.forEach(element => {
// 			console.log(element);
// 		});
// 		// await client.save();
// 		res.status(200).send(client);
// 	} catch (e) {
// 		console.log(e);
// 		res.status(400).send(e.message);
// 	}
// });

// Updating client profile data
router.patch('/client/editProfile', upload.single('upload'), authClient, async (req, res) => {
	try {
		if(req.file){
			const buffer = await sharp(req.file.buffer).resize({ width:250 ,height:250 }).png().toBuffer(); //output from sharp
			req.client.profilePic = buffer;
		}
		updates.forEach((update) => req.client[update] = req.body[update]);// Dynamic update  
		await req.client.save();

		res.send(req.client);
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