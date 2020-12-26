const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Coach = require('../../src/models/coach');
const Client = require('../../src/models/client');

const coachOneID = new mongoose.Types.ObjectId();
const clientOneID = new mongoose.Types.ObjectId();
const clientTwoID = new mongoose.Types.ObjectId();
const clientThirdID = new mongoose.Types.ObjectId();



const coachOne = {
	_id: coachOneID,
	name: 'Shadi',
	email: 'Shadi@example.com',
	password: 'MyPass123123',
	myClients: [{ //Clients ID's with this
		id: clientOneID,
	}, {
		id: clientTwoID,
	},
	{
		id: clientThirdID,
	}],
	tokens: [{
		token: jwt.sign({ _id: coachOneID }, process.env.JWT_SECRET)
	}]
};

const clientOne = {
	_id: clientOneID,
	name: 'Tharaa',
	email: 'Tharaa@example.com',
	password: 'MyPass123123',
	birthDate: 2001-2-5,
	height: 180,
	weight: 50,
	coachID: coachOneID,
	tokens: [{
		token: jwt.sign({ _id: clientOneID }, process.env.JWT_SECRET)
	}]
};
const clientTwo = {
	_id: clientTwoID,
	name: 'WISAM',
	email: 'WISAMGOD@example.com',
	password: 'MyPass123123',
	birthDate: 2001-2-5,
	height: 180,
	weight: 50,
	coachID: coachOneID,
	tokens: [{
		token: jwt.sign({ _id: clientTwoID }, process.env.JWT_SECRET)
	}]
};
const clientThird = {
	_id: clientThirdID,
	name: 'KRATOS',
	email: 'kratos@example.com',
	password: 'MyPass123123',
	birthDate: 2001-2-5,
	height: 180,
	weight: 50,
	coachID: coachOneID,
	tokens: [{
		token: jwt.sign({ _id: clientThirdID }, process.env.JWT_SECRET)
	}]
};



const setupDatabase = async () => {
	await Coach.deleteMany();
	await Client.deleteMany();
	await new Coach(coachOne).save();
	await new Client(clientOne).save();
	await new Client(clientTwo).save();
	await new Client(clientThird).save();
};

module.exports = {
	coachOne,
	coachOneID,
	clientOne,
	clientTwo,
	clientThird,
	clientOneID,
	clientTwoID,
	clientThirdID,
	setupDatabase
};

afterAll( async () => {
	await mongoose.disconnect();
});