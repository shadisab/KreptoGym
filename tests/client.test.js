const request = require('supertest');
const app = require('../src/app');
const Client = require('../src/models/client');
const Coach = require('../src/models/coach');
// const bcrypt = require('bcryptjs');

const {
	coachOneID,
	clientOne,
	// clientTwo,
	clientOneID,
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
		coachID: coachOneID
	}).expect(201);
	// Assert that the DB was changed correctly
	const client = await Client.findById(response.body.client._id);
	expect(client).not.toBeNull();

	// Assertions about the response
	expect(response.body).toMatchObject({
		client: {
			name: 'clientsignup',
			email: 'clientsign@example.com',
			age: 15,
			height: 180,
			weight: 50
		},
		token: client.tokens[0].token
	});
	// Checking the hashing
	expect(client.password).not.toBe('MyPass123123');

	// Checking if the client was added to his coach's clients list
	const coach = await Coach.findById(coachOneID);
	let temp = false;

	coach.myClients.forEach((client) => {
		if (client.id.toString() === response.body.client._id.toString()){
			temp = true;
		}
	});
	expect(temp).toBe(true);
});



// Login Test
test('Should login existing client', async () => {
	const response = await request(app).post('/usersLogin').send({
		email: clientOne.email,
		password: clientOne.password
	}).expect(200);

	// Assertions
	const client = await Client.findById(clientOneID);
	expect(response.body.token).toBe(client.tokens[1].token);
});

// Testing change password
// test('Should update valid user Password', async () => {
// 	await request(app)
// 		.patch('/clients/password')
// 		.set('Cookie','Authorization=Bearer '+`${clientTwo.tokens[0].token}`)
// 		.send({
// 			password: 'MyPass123123',
// 			newPassword: '123456789'
// 		})
// 		.expect(200);
// 	const client = await Client.findById(clientTwoID);
// 	expect(await bcrypt.compare('123456789', client.password)).toBe(true);
// });

// test('Should not update invalid user fields', async () => {
// 	await request(app)
// 		.patch('/clients/password')
// 		.set('Cookie','Authorization=Bearer '+`${clientTwo.tokens[0].token}`)
// 		.send({
// 			password: 'Majdal shams', //Wrong password
// 			newPassword: '456987123'
// 		})
// 		.expect(400);
// });

//Delete user while not authenticated
// test('Should not delete a client', async () => {
// 	await request(app)
// 		.delete('/clients/myProfile')
// 		.send()
// 		.expect(401);
// });
//Delete user while authenticated
// test('Should delete user', async () => {
// 	await request(app)
// 		.delete('/clients/myProfile')
// 		.set('Cookie','Authorization=Bearer '+`${clientTwo.tokens[0].token}`)
// 		.send()
// 		.expect(200);
// 	const client = await Client.findById(clientTwoID);
// 	expect(client).toBeNull();
// 	const coach = await Coach.findById(coachOneID);
// 	let temp = false;
// 	coach.myClients.forEach((client) => {
// 		if (client.id.toString() === clientTwoID.toString()){
// 			temp = true;
// 		}
// 	});
// 	expect(temp).toBe(false);
// });

//Getting client profile
// test('Should get profile of the user', async () => {
// 	await request(app)
// 		.get('/clients/myProfile')
// 		.set('Cookie','Authorization=Bearer '+`${clientTwo.tokens[0].token}`)
// 		.send()
// 		.expect(200);
// });

// Getting client profile while not authenticated
// test('Should Not get profile for unauthenticated user', async () => {
// 	await request(app)
// 		.get('/clients/myProfile')
// 		.send()
// 		.expect(401);
// });
