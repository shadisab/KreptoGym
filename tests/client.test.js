const request = require('supertest');
const app = require('../src/app');
const Client = require('../src/models/client');
//const Coach = require('../src/models/coach');
// const bcrypt = require('bcryptjs');

const {
	coachOneID,
	//clientOne,
	// clientTwo,
	//clientOneID,
	// clientTwoID,
	setupDatabase
} = require('./fixtures/db');

beforeEach(setupDatabase); /* this function runs before each test case in this test suite.  */


test('Should signup a new client', async () => {
	const response = await request(app).post('/clients/signup').send({
		name: 'clientsignup',
		email: 'clientsign@example.com',
		password: 'MyPass123123',
		birthDate: 2002-2-6,
		height: 180,
		weight: 50,
		coachID: coachOneID,
		country:'Albania',
		gender: 'Male'
	}).expect(201);
	// Assert that the DB was changed correctly
	const client = await Client.findById(response.body.client._id);
	expect(client).not.toBeNull();
	// Checking the hashing
	expect(client.password).not.toBe('MyPass123123');
});