const { signedCookie } = require('cookie-parser')
const request = require('supertest')
const app = require('../src/app')
const Client = require('../src/models/client')
const Coach = require('../src/models/coach')
const bcrypt = require('bcryptjs')

const {
    coachOne,
    coachOneID,
    clientOne,
    clientTwo,
    clientThird,
    clientOneID,
    clientTwoID,
    clientThirdID,
    setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase) /* this function runs before each test case in this test suite.  */


test('Should signup a new client', async () => {
    const response = await request(app).post('/clients/signup').send({
        name: 'clientsignup',
        email: 'clientsign@example.com',
        password: 'MyPass123123',
        age: 15,
        height: 180,
        weight: 50,
        coachID: coachOneID
    }).expect(201)
    // Assert that the DB was changed correctly
    const client = await Client.findById(response.body.client._id)
    expect(client).not.toBeNull()

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
    })
    // Checking the hashing
    expect(client.password).not.toBe('MyPass123123')

    // Checking if the client was added to his coach's clients list
    const coach = await Coach.findById(coachOneID)
    let temp = false

    coach.myClients.forEach((client) => {
         if (client.id.toString() === response.body.client._id.toString()){
            temp = true
         }
    })
    expect(temp).toBe(true)
})



// Login Test
test('Should login existing client', async () => {
    const response = await request(app).post('/clients/login').send({
        email: clientOne.email,
        password: clientOne.password
    }).expect(200)

    // Assertions
    const client = await Client.findById(clientOneID)
    expect(response.body.token).toBe(client.tokens[1].token)
})

// Testing change password
test('Should update valid user Password', async () => {
    await request(app)
    .patch('/clients/password')
    .set('Cookie','Authorization=Bearer '+`${clientTwo.tokens[0].token}`)
    .send({
        password: 'MyPass123123',
        newPassword: '123456789'
    })
    .expect(200)
    const client = await Client.findById(clientTwoID)
    expect(await bcrypt.compare('123456789', client.password)).toBe(true)
})

test('Should not update invalid user fields', async () => {
    await request(app)
    .patch('/clients/password')
    .set('Cookie','Authorization=Bearer '+`${clientTwo.tokens[0].token}`)
    .send({
        password: 'Majdal shams', //Wrong password
        newPassword: '456987123'
    })
    .expect(400)
})