const request = require('supertest');
const app = require('../src/app');
const Coach = require('../src/models/coach');
const bcrypt = require('bcryptjs');
const {
	coachOne,
	coachOneID,
	setupDatabase
} = require('./fixtures/db');

beforeEach(setupDatabase); /* this function runs before each test case in this test suite.  */

test('Should signup a new coach', async (d) => {
	const response = await request(app).post('/coachs/signup').send({
		name: 'Shadi',
		email: 'shadi12345@example.com',
		password: 'MyPass123123'
	}).expect(201);

	// Assert that the DB was changed correctly
	const coach = await Coach.findById(response.body.coach._id);
	expect(coach).not.toBeNull();

	// Assertions about the response
	expect(response.body).toMatchObject({
		coach: {
			name: 'Shadi',
			email: 'shadi12345@example.com',
		},
		token: coach.tokens[0].token
	});
	expect(coach.password).not.toBe('MyPass123123'); // Checking the hashing
	d();
});


// Login Test
test('Should login existing coach', async (d) => {
	const response = await request(app).post('/coachs/login').send({
		email: coachOne.email,
		password: coachOne.password
	}).expect(200);

	// Assertions
	const coach = await Coach.findById(coachOneID);
	expect(response.body.token).toBe(coach.tokens[1].token);
	d();
});

// Testing change password
test('Should update valid user Password', async (d) => {
	await request(app)
		.patch('/coachs/password')
		.set('Cookie','Authorization=Bearer '+`${coachOne.tokens[0].token}`)
		.send({
			password: 'MyPass123123',
			newPassword: '123456789'
		})
		.expect(200);
	const coach = await Coach.findById(coachOneID);
	expect(await bcrypt.compare('123456789', coach.password)).toBe(true);
	d();
});

test('Should not update invalid user fields', async (d) => {
	await request(app)
		.patch('/coachs/password')
		.set('Cookie','Authorization=Bearer '+`${coachOne.tokens[0].token}`)
		.send({
			password: 'Majdal shams', //Wrong password
			newPassword: '456987123'
		})
		.expect(400);
	d();
});

//Getting coach profile
test('Should get profile of the user', async (d) => {
	await request(app)
		.get('/coachs/myProfile')
		.set('Cookie','Authorization=Bearer '+`${coachOne.tokens[0].token}`)
		.send()
		.expect(200);
	d();
});

// Getting coach profile while not authenticated
test('Should Not get profile for unauthenticated user', async function (done)  {
	await request(app)
		.get('/coachs/myProfile')
		.expect(401);
	done();
});

afterAll((done) => {
	done();
});