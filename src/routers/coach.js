const express = require('express');
const multer = require('multer');
const Coach = require('../models/coach');
const Client = require('../models/client');
const { authCoach } = require('../middleware/auth');
const { Error } = require('mongoose');
const { sendmsg } = require('../db/Mails');
const router = new express.Router();


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
// router.post('/upload/TerminationCertificate', upload.single('upload'), async (req, res) => {
// 	req.coach.TerminationCertificate = req.file.buffer;
// 	await req.coach.save();
// 	res.send();
// }, (error, req, res) => { //Call back function to handle errors
// 	res.status(400).send({ error: error.message });
// });
/************************************************/
// Sign up 2
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

// Sign up 1
// router.post('/coachs/signup', async (req, res) => {
// 	const coach = new Coach(req.body);
// 	try {
// 		await coach.save();
// 		await sendmsg(coach.email, `Welcome to our team ${coach.name}`, `Hey ${coach.name},\nGlad to see you on our team, your request has been sent, we will check your uploaded resume and update you as soon as we can.\nThanks have a good day.`);
// 		res.status(201).send({ coach });
// 	} catch (e) {
// 		res.status(400).send(e);
// 	}
// });


// Login
// router.post('/coachs/login', async (req, res) => {
// 	try {
// 		// Self Created findByCredntials() , generateAuthToken()
// 		const coach = await Coach.findByCredentials(req.body.email, req.body.password);
// 		const client = await Client.findByCredentials(req.body.email, req.body.password);
// 		console.log('client:', client, 'coach is:', coach);
// 		// const token = await coach.generateAuthToken();
// 		// res.cookie('Authorization', `Bearer ${token}`); // Save the token to cookies
// 		res.send();
// 	} catch (e) {
// 		console.log(e);
// 		res.status(400).send(e);
// 	}
// });

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
		}else{
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
		client.trainingSchedule[req.body.day][req.body.type].push(req.body.data);
		await client.save();
		
		res.send(client);
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

// Updating Nutrition for a client
// router.patch('/coachs/client/nutrition/:id', authCoach, async (req, res) => {
// 	const allowerdUpdates = ['protine', 'carbs', 'fats', 'notes', 'calories'];
// 	const updates = Object.keys(req.body);
// 	const isValidOperation = updates.every((update) => allowerdUpdates.includes(update));
// 	if (!isValidOperation) {
// 		return res.status(400).send({ error: 'Invalid updates!' });
// 	}

// 	try {
// 		const client = await Client.findOne({ _id: req.params.id, coachID: req.coach._id });
// 		if (!client) {
// 			return res.status(404).send('Cant Find client');
// 		}
// 		updates.forEach((update) => client.nutrition[update] = req.body[update]);// Dynamic update
// 		await client.save();
// 		await sendmsg(client.email, 'A new updates', `Hey ${client.name},\nwe are happy to let you know that your coach has been made some updates to your nutrition values,\nplease check it for better results.\nKrepto Gym team.`);
// 		res.send(client.nutrition);
// 	} catch (e) {
// 		console.log(e);
// 		res.status(400).send(e);
// 	}
// });


// Updating TrainingSchedule for a client
// router.patch('/coachs/client/trainingSchedule/:id', authCoach, async (req, res) => {

// 	const updates = Object.keys(req.body);
// 	const allowerdUpdates = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
// 	const isValidOperation = updates.every((update) => allowerdUpdates.includes(update));
// 	if (!isValidOperation) {
// 		return res.status(400).send({ error: 'Invalid updates!' });
// 	}

// 	try {
// 		const client = await Client.findOne({ _id: req.params.id, coachID: req.coach._id });
// 		if (!client) {
// 			return res.status(404).send('Cant Find client');
// 		}
// 		updates.forEach((update) => client.trainingSchedule[update] = req.body[update]);// Dynamic update
// 		await client.save();

// 		res.send(client.nutrition);
// 	} catch (e) {
// 		console.log(e);
// 		res.status(400).send(e);
// 	}
// });


// GET Coach profile
router.get('/coachs/myProfile', authCoach, async (req, res) => {
	res.send(req.coach);

});
// Updating coach Password
router.patch('/coachs/password', async (req, res) => {
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
module.exports = router;