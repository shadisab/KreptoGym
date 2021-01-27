const express = require('express');
const Coach = require('../models/coach');
const Admin = require('../models/admin');
const router = new express.Router();
const generator = require('generate-password');
const {sendmsg} = require('../db/Mails');
const {authAdmin} = require('../middleware/auth');


// Allowed updates for coach
const CoachallowedUpdates = ['name', 'email', 'status'];

router.post('/admin/signup', async (req, res) => {
	const admin = new Admin(req.body);
	try {
		await admin.save();
		res.status(201).send({ admin });
	} catch (e) {
		res.status(400).send(e);
	}
});
// Sign up by returning a token
router.post('/adminpassword', async (req, res) => {
	var password = generator.generate({
		length: 20,
		numbers: true
	});
	var name = 'admin';
	const admin = await Admin.findOne({ name });
	admin.password = password;
	await admin.save();
	res.status(201).send({ password });
});

// Login
router.post('/admin/login', async (req, res) => {
	try {
		// Self Created findByCredntials() , generateAuthToken()
		const admin = await Admin.findByCredentials(req.body.name, req.body.password);
		const token = await admin.generateAuthToken();
		res.cookie('Authorization', `Bearer ${token}`);
		res.send({ admin, token });
	} catch (e) {
		res.status(400).send(e);
	}
});

//Single logout from specific login  admin
router.post('/admin/logout', authAdmin, async (req, res) => {
	try {
		req.admin.tokens = req.admin.tokens.filter((token) => {
			return token.token !== req.token; //if return is false than it going to remove by filter
		});
		await req.admin.save();
		await res.clearCookie('Authorization');
		res.status(200).send(req.admin);
	} catch (e) {
		res.status(500).send();
	}
});

//Get all coaches
router.get('/usersList', authAdmin, async (req, res) => {
	try {
		const coachs = await Coach.find();
		res.send(coachs);
	} catch (e) {
		res.status(400).send(e);
	}
});

//Get choosen coach data
router.get('/BOcoachView/:id/profile',authAdmin, async(req, res) => {
	try {
		const coachs = await Coach.findById(req.params.id);
		res.send(coachs);
	} catch (e) {
		res.status(400).send(e);
	}

});


// Accept Coach From BackOffice
router.patch('/coachs/:id', authAdmin, async (req, res) => {
	const firstPass = Math.floor(1000000 + Math.random() * 9999999); //Generate coach first password
	const update = 'status';
	try {
		const coach = await Coach.findById(req.params.id);
		coach[update] = req.body[update];
		coach.password = firstPass;
		await coach.save();
		await sendmsg(coach.email, `Updating status to ${coach.name}`,`Hey ${coach.name},\nWe read your uploaded resume, we see you gonna make a good progress with us Your login code ${firstPass} please maek your first log in and change your password.\n Welcome to our team, Wish you all the best.` );
		res.status(200).send(coach);
	} catch (e) {
		res.status(400).send(e);
	}
});


// Reject The request by the admin cayse to delete the reqyested coach data
router.delete('/coach/delete/:id', authAdmin,  async (req, res) => {
	try {
		const coach = await Coach.findByIdAndDelete(req.params.id);
		if (!coach) {
			return res.status(404).send({error: 'Cant Find coach'});
		}
		await sendmsg(coach.email, `Updating status to ${coach.name}`,`Hey ${coach.name},\nWe read your uploaded resume, and we are sorry to update you that you are not relevant to our team.` );
		res.send(coach);
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = router;