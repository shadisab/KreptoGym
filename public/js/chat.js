/* eslint-disable no-undef */

$(document).ready(async ()=> {

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const  room = urlParams.get('room');
	const username = urlParams.get('username');
	const socket = io();
    
	const autoscroll = () => {
		// Height of the new message
		const newMessageStyles = getComputedStyle(document.querySelector('#messages').lastElementChild);
		const newMessageMargin = parseInt(newMessageStyles.marginBottom);
		const newMessageHeight = document.querySelector('#messages').lastElementChild.offsetHeight + newMessageMargin;
		
		//visable height
		const visibleHeight = document.querySelector('#messages').offsetHeight;

		// Height of messages container
		const containerHeight = document.querySelector('#messages').scrollHeight;

		//How far have I scrolled?
		const scrollOffset = document.querySelector('#messages').scrollTop + visibleHeight;
        
		if((containerHeight - newMessageHeight <= scrollOffset)){ // if We wherein the bottom before the last message was added so we will auto-scroll, if not so will stay at the same view
			document.querySelector('#messages').scrollTop = document.querySelector('#messages').scrollHeight;
		}

	};



	socket.on('message', (message) => {
		console.log(message);
		$('#messages').append(`<div class="message"><p><span class="message__name">${message.username} </span><span class="message__meta">${moment(message.createdAt).format('h:mm a')}</span></p><p>${message.text} </p></div>`);
		autoscroll();
	});
    
	socket.on('locationMessage', (url)=>{
		$('#messages').append(`<div class="message"><p><span class="message__name">${url.username} </span><span class="message__meta">${moment(url.createdAt).format('h:mm a')}</span></p><a href=${url.text} target="_blank">My cuurent location</a></p></div>`);
	});
    
	$('#message-form').on('submit', (e)=> {
		e.preventDefault();
		$('#send-button').attr('disabled', 'disabled');
		const text = $('#message-input').val();
		socket.emit('sendMessage', {text,username,room}, (error)=>{
			$('#send-button').removeAttr('disabled');
			$('#message-input').val('');  
			$('#message-input').focus();
			if(error){
				return console.log(e);
			}
			console.log('Message delivered!');
		});
	});
    
	$('#send-location').on('click',()=>{
		if(!navigator.geolocation){
			return alert('Geolocation is not supported');
		}
		$('#send-location').attr('disabled', 'disabled');
		navigator.geolocation.getCurrentPosition( (position) =>{
			socket.emit('sendLocation', {
				username,
				room,
				coords: {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude 
				}
			}, ()=>{
				$('#send-location').removeAttr('disabled');
				console.log('Location Shared');
			});
		});
	});
    
	socket.emit('join',{username, room});
});

