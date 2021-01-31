const express = require('express');
const multer = require('multer');
const Coach = require('../models/coach');
const Client = require('../models/client');
const { authCoach } = require('../middleware/auth');
const { Error } = require('mongoose');
const { sendmsg } = require('../db/Mails');
const router = new express.Router();
const sharp = require('sharp');


//Termination Certificate
const upload = multer({
	limits: { fileSize: 2000000 },
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|PNG|png)$/)) {
			return cb(new Error('Please upload a image'));
		}
		cb(undefined, true);
	}
});

router.post('/coachsignup', upload.single('upload'), async (req, res) => {
	const coach = new Coach(req.body);
	coach.TerminationCertificate = req.file.buffer;
	try {
		await coach.save();
		await sendmsg(coach.email, `Welcome to our team ${coach.name}`, `Hey ${coach.name},\nGlad to see you on our team, your request has been sent, we will check your uploaded resume and update you as soon as we can.\nThanks have a good day.`);
		await sendmsg('kreptogym@gmail.com', `A new request from ${coach.name}`, 'You have a new request waiting for your review');
		res.status(201).send();
	} catch (error) {
		res.status(400).send({ error: error.message });
	}

});

router.patch('/coachsignupV2', upload.single('upload'), authCoach, async (req, res) => {
	
	try {
		const coach = await Coach.findById(req.coach._id);
		if (req.file) {
			const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer(); //output from sharp
			coach.profilePic = buffer;
		}
		coach.name = req.body.name;
		coach.password = req.body.password;
		coach.aboutMe = req.body.aboutMe;
		coach.firstLogin = 'true';
		await coach.save();
		await res.status(200).send(coach);
	} catch (e) {
		res.status(400).send(e.message);
	}

});

//Single logout from specific login coach
router.post('/coachs/logout', authCoach, async (req, res) => {
	try {
		req.coach.tokens = req.coach.tokens.filter((token) => {
			return token.token !== req.token; //if return is false than it going to remove by filter
		});
		await req.coach.save();
		await res.clearCookie('Authorization');
		res.status(200).send(req.coach);
	} catch (e) {
		res.status(500).send();
	}
});



router.get('/coaches/:id/TerminationCertificate', async (req, res) => {
	try {
		const coach = await Coach.findById(req.params.id);
		if (!coach || !coach.TerminationCertificate) {
			throw new Error();
		}
		res.send(coach.TerminationCertificate);
	} catch (error) {
		res.status(404).send(error.message);
	}
});

// GET client Nutrition
router.get('/coachs/client/nutrition/:id', authCoach, async (req, res) => {
	const client = await Client.findOne({ _id: req.params.id, coachID: req.coach._id });
	res.status(200).send(client.nutrition);
	if (!client) {
		return res.status(404).send('Cant Find client');
	}
});

// GET specific client TrainingSchedule
router.get('/coachs/client/:id', authCoach, async (req, res) => {
	try {
		const client = await Client.findOne({ _id: req.params.id, coachID: req.coach._id });
		if (!client) {
			throw new Error('Cant Find client');
		} else {
			res.status(200).send(client);
		}
	}
	catch (e) {
		res.status(400).send(e.message);
	}

});

// Post TrainingSchedule for a client
router.post('/coachs/client/trainingSchedule/:id', authCoach, async (req, res) => {
	try {
		const client = await Client.findOne({ _id: req.params.id, coachID: req.coach._id });
		if (!client) {
			return res.status(404).send('Cant Find client');
		}
		let index = client.trainingSchedule[req.body.day][req.body.type].push(req.body.data);
		await client.save();
		let exArrayAdded = client.trainingSchedule[req.body.day][req.body.type]; //Return the Added index after it added to the DB
		var objectFound = exArrayAdded[index-1];
		res.status(200).send(objectFound);
	} catch (e) {
		console.log(e);
		res.status(400).send(e.message);
	}
});

// GET client TrainingSchedule
router.get('/coachs/client/trainingSchedule/:id', authCoach, async (req, res) => {
	const client = await Client.findOne({ _id: req.params.id, coachID: req.coach._id });
	res.status(200).send(client.trainingSchedule);
	if (!client) {
		return res.status(404).send('Cant Find client');
	}
});

// Get specific exercise for a client
router.get('/coachs/client/exercise/:id/:exID/:exType/:exDay', authCoach, async (req, res) => {
	let exID = req.params.exID;
	let exType = req.params.exType;
	let exDay = req.params.exDay;
	try {
		const client = await Client.findOne({ _id: req.params.id, coachID: req.coach._id });
		if (!client) {
			return res.status(404).send('Cant Find client');
		}
		let exArrayDel = client.trainingSchedule[exDay][exType];
		let indexToDel = exArrayDel.map(function(x) {return x._id; }).indexOf(exID);
		
		res.status(200).send(exArrayDel[indexToDel]);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
});

// Updating specific exercise for a client
router.patch('/coachs/client/trainingSchedule/:id/:exID/:exType/:exDay', authCoach, async (req, res) => {
	let exID = req.params.exID;
	let exType = req.params.exType;
	let exDay = req.params.exDay;
	try {
		const client = await Client.findOne({ _id: req.params.id, coachID: req.coach._id });
		if (!client) {
			return res.status(404).send('Cant Find client');
		}
		/*Deleting the Updated Exc */
		let exArrayDel = client.trainingSchedule[exDay][exType];
		let indexToDel = exArrayDel.map(function(x) {return x._id; }).indexOf(exID);
		client.trainingSchedule[exDay][exType].splice(indexToDel, 1);

		/**Adding the new Exc */
		let index = client.trainingSchedule[exDay][req.body.type].push(req.body.data);

		await client.save();
		let exArrayupdate = client.trainingSchedule[exDay][req.body.type]; //Return the Added index after it added to the DB
		var objectFound = exArrayupdate[index-1];
		
		res.status(200).send(objectFound);
	} catch (e) {
		console.log(e);
		res.status(400).send(e.message);
	}
});

// Deleteing TrainingSchedule for a client
router.delete('/coachs/client/trainingSchedule/:id', authCoach, async (req, res) => {

	try {
		const client = await Client.findOne({ _id: req.params.id, coachID: req.coach._id });
		if (!client) {
			return res.status(404).send('Cant Find client');
		}
		let exArrayDel = client.trainingSchedule[req.body.day][req.body.type];
		let indexToDel = exArrayDel.map(function(x) {return x._id; }).indexOf(req.body.id);
		client.trainingSchedule[req.body.day][req.body.type].splice(indexToDel, 1);
		await client.save();
		res.status(200).send(client.trainingSchedule);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
});


// GET Coach profile
router.get('/coachs/myProfile', authCoach, async (req, res) => {
	res.send(req.coach).status(200);

});

// Updating coach Profile
router.patch('/coachs/editProfile', upload.single('upload'), authCoach, async (req, res) => {

	try {
		const coach = await Coach.findById(req.coach._id);
		if (req.file) {
			const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer(); //output from sharp
			coach.profilePic = buffer;
		}
		coach.name = req.body.name;
		await coach.save();
		await res.status(200).send(coach);
	} catch (e) {
		res.status(400).send(e.message);
	}
});


// Updating coach Password
router.patch('/coachs/password', authCoach, async (req, res) => {
	const allowerdUpdates = 'password';
	try {
		const coach = await Coach.findByCredentials(req.coach.email, req.body.password);
		if (req.body.password === req.body.newPassword) {
			throw new Error('New password must not be the same as old password');
		}
		coach[allowerdUpdates] = req.body.newPassword;
		await coach.save();
		res.status(200).send(coach);
	} catch (e) {
		res.status(400).send(e);
	}
});

// GET all Clients of this coach
router.get('/coaches/myClients', authCoach, async (req, res) => {
	//get array of id's of all clients that this coach is train
	const match = {};
	match.status = 'Accepted';
	await req.coach.populate({
		path: 'myClients',
		match,
		options: {
			limit: 6,
			skip: parseInt(req.query.skip)
		}
	}).execPopulate();
	res.send(req.coach.myClients);
});

// GET all the requested clients
router.get('/coaches/reqClients', authCoach, async (req, res) => {
	//get array of id's of all clients that this coach is train
	const match = {};
	match.status = 'Pending';
	await req.coach.populate({
		path: 'myClients',
		match
	}).execPopulate();
	res.send(req.coach.myClients);
});

//Reject Client
router.delete('/coach/deleteClient/:id', authCoach, async (req, res) => {
	console.log(req.params.id);
	try {
		const client = await Client.findOne({ _id: req.params.id, coachID: req.coach._id });
		await client.remove();
		sendmsg(client.email, `Updating status to ${client.name}`, `Hey ${client.name},\nYour coach just Rejected you.`);
		res.status(200).send(client);
	}
	catch (e) {
		res.status(404).send(e.message);
	}
});


// Accept Client
router.patch('/coach/accepteClient/:id', authCoach, async (req, res) => {
	const update = 'status';
	try {
		const client = await Client.findOne({ _id: req.params.id, coachID: req.coach._id });
		client[update] = 'Accepted';
		await client.save();
		sendmsg(client.email, `Updating status to ${client.name}`, `Hey ${client.name},\nYour coach just Accepted you.`);
		res.status(200).send(client);
	} catch (e) {
		res.status(400).send(e);
	}
});
module.exports = router;