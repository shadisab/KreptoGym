const path = require('path');
const express = require('express');
const http = require('http');
const hbs = require('hbs');
require('./db/mongoose');
const clientRouter = require('./routers/client');
const coachRouter = require('./routers/coach');
const backofficeRouter = require('./routers/Backoffice');
const cookie = require('cookie-parser');
const {authClient , authCoach, authAdmin} = require('./middleware/auth');
const socketio = require('socket.io');
const Filter = require('bad-words');
const {generateMessage} = require('./utils/messages');

const app = express();
const server = http.createServer(app); // If we don't do this, The express library does 
//this behind the since, We just need to do refactoring. just to make it easier to set up a socket.io.
//in this way we have access to pass our server to web sockets
const io = socketio(server); 


io.on('connection', (socket) => { //This method will run for each Client that connect to the "Chat" in a differents ways
	console.log('New WebSocket Connectented');

	socket.on('join', ({username, room})=>{
		socket.join(room);
		socket.emit('message',generateMessage('Welcome!','KryptoGym Service')); //Every single new connected client will receive this message from the server
		socket.broadcast.to(room).emit('message',generateMessage(`${username} has joined`,'KryptoGym Service')); //Send to everybody except the current client( current socket)


		//socket.emit -> sends an event to a specific client.
		//io.emit -> which sends an event to every connected client.
		//socket.broadcast.emit -> which sends an event to every connected client except to the current client( current socket)
		//io.to.emit -> emits an event to everybody in a specific room.
		//socket.broadcast.to.emit -> This is sending an event to everyone except for the specific client but it's limiting it to a specific chat room.
	});


	socket.on('sendMessage', ({text,username,room}, callback)=>{
		const filter = new Filter();
		if(filter.isProfane(text)){
			return callback('Not allowed to use bad words!');
		}
		io.to(room).emit('message',generateMessage(text,username));
		callback();
	});

	socket.on('sendLocation', ({username,room,coords}, callback)=>{
		io.to(room).emit('locationMessage',generateMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`,username));
		callback();
	});

	// socket.on('increment', ()=>{
	// 	count++;
	// 	//socket.emit('countUpdated', count); //Scoket.emit is emited to a single connection (emites and event to a specifc connection )
	// 	io.emit('countUpdated', count); //emited event to every single connection thats currnelty avaible
	// });
	// Socket.emit is to send 

	socket.on('disconnect', ()=>{ //When ever a clint get disconnected
		io.emit('message',generateMessage('A user has left','KryptoGym Service'));
	});
});


const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
 
app.use(cookie());
app.use(express.json());
app.use(express.static(publicDirectoryPath));
app.use(clientRouter);
app.use(coachRouter);
app.use(backofficeRouter);

app.get('', (req , res) => {
	res.render('index');
});

app.get('/chat', (req,res) => {
	res.render('chat', {
		
	});
});

app.get('/joinChat', (req,res) => {
	res.render('joinChat', {
		
	});
});

app.get('/adminLogin', (req,res) => {
	res.render('adminLogin', {
		
	});
});

app.get('/backoffice', authAdmin, (req , res) => {
	res.render('backoffice',{

	});
});

app.get('/BOcoachView', authAdmin, (req, res)=>{
	res.render('BOcoachView', {

	});
});


app.get('/clientRegister', (req , res) => {
	res.render('clientRegister',{

	});
});


app.get('/coachRegister' , (req , res) => {
	res.render('coachRegister');
});

app.get('/coachLogin', (req , res) => {
	res.render('coachLogin',{

	});
});

app.get('/coachHome', (req , res) => {
	res.render('coachHome',{
	});
});

app.get('/clientLogin', (req , res) => {
	res.render('clientLogin',{

	});
});

app.get('/about', (req , res) => {
	res.render('about',{

	});
});

app.get('/help', (req , res) => {
	res.render('help',{

	});
});

app.get('/clientHelp', (req , res) => {
	res.render('clientHelp',{

	});
});

app.get('/coachHelp', (req , res) => {
	res.render('coachHelp',{

	});
});

app.get('/coachScheduleUpdate' , authCoach , (req , res) => {
	res.render('coachScheduleUpdate');
});

app.get('/clientSchedule', authClient, (req , res) => {
	res.render('clientSchedule');
});

app.get('/coachClients', (req , res) => {
	res.render('coachClients');
});

app.get('/clientProfile', authClient , (req , res) => {
	res.render('clientProfile');
});

app.get('/coachProfile', authCoach , (req , res) => {
	res.render('coachProfile');
});

app.get('*', (req,res) => {
	res.render('404',{
		title: '404',
		message: 'Page not found!',
		name: 'Wisam Halabi'
	});
});
module.exports = server;