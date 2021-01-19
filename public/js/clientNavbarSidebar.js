/* eslint-disable no-undef */
$(document).ready(async () => {

	var clientname = '';
	var clientID = '';
	var coachID = '';
	const clientProfile = await fetch('/clients/myProfile',{
		method: 'GET', 
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	});
	if(clientProfile.status === 200){
		clientProfile.json().then((data)=>{
			clientID = data._id;
			clientname = data.name;
			coachID = data.coachID;

			$('#name').text(data.name);
			$('#email').text(data.email);
			$('#gender').text(data.gender);
			$('#birthDate').text(moment(data.birthDate).format('YYYY-MM-DD'));
			$('#country').text(data.country);
			$('#height').text(data.height);
			$('#weight').text(data.weight);
			$('#acc-settings-btn-icon').attr('src', `data:image/png;base64,${data.profilePic}`);
			$('#image').attr('src', `data:image/png;base64,${data.profilePic}`);
		});	
	}

	$('#edit').on('click', ()=> {
		window.location.href = '/clientProfile';
	});

	$('#logout').on('click', async () => {
		const logout = await fetch('/clients/logout', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		});

		if (logout.status === 200) {
			window.location.replace('/');
		}
		if (logout.status === 500) {
			console.log('Problem with log out.');
		}
	});


	var numOfNotifications = $('#notification-dd-content').children().length;
	$('#notifications-icon-numbers').text(numOfNotifications);

	$('#chat').on('click', ()=> {
		window.location.href = (`/chat?username=${clientname}&room=${clientID}+${coachID}`);
	});
	$('#sidebar-open-close').click(() => {
		if ($('#Sidenav').width() == '0') {
			$('#Sidenav').css('width', '250px');
		} else {
			$('#Sidenav').css('width', '0');
		}
	});
	$('#acc-settings-btn-div').click(() => {
		if ($('#account-dropdown-div').height() == '0') {
			$('#acc-settings-btn-div').css('background-color', 'rgb(39, 38, 38)');
			$('#account-dropdown-div').css('height', '500px');
			$('#account-dropdown-div').css('width', '300px');
			$('#account-dropdown-div').css('display', 'flex');
			$('#acc-settings-btn-div').css('border-left', '1px #666 solid');
			$('#acc-settings-btn-div').css('border-right', '1px #666 solid');
			$('#acc-settings-btn-div').css('border-top', '1px #666 solid');
			$('#notification-dd-content-div').css('display','none');
			$('#profile-dd-content').css('display','flex');
		} else if ($('#notification-btn').css('background-color') == 'rgb(39, 38, 38)') {
			$('#acc-settings-btn-div').css('background-color', 'rgb(39, 38, 38)');
			$('#account-dropdown-div').css('width', '300px');
			$('#notification-btn').css('background-color', '#333');
			$('#notification-btn').css('border-left', '');
			$('#notification-btn').css('border-right', '');
			$('#notification-btn').css('border-top', '');
			$('#acc-settings-btn-div').css('border-left', '1px #666 solid');
			$('#acc-settings-btn-div').css('border-right', '1px #666 solid');
			$('#acc-settings-btn-div').css('border-top', '1px #666 solid');
			$('#notification-dd-content-div').css('display','none');
			$('#profile-dd-content').css('display','flex');
		} else {
			$('#acc-settings-btn-div').css('background-color', '#333');
			$('#account-dropdown-div').css('height', '0');
			$('#acc-settings-btn-div').css('border-left', '');
			$('#acc-settings-btn-div').css('border-right', '');
			$('#acc-settings-btn-div').css('border-top', '');
			$('#account-dropdown-div').css('display', 'none');
			$('#account-dropdown-div').css('width', '0');
		}
	});
	$('#notification-btn').click(() => {
		if ($('#account-dropdown-div').height() == '0') {
			$('#notification-btn').css('background-color', 'rgb(39, 38, 38)');
			$('#account-dropdown-div').css('height', '500px');
			$('#account-dropdown-div').css('width', '400px');
			$('#account-dropdown-div').css('display', 'flex');
			$('#notification-btn').css('border-left', '1px #666 solid');
			$('#notification-btn').css('border-right', '1px #666 solid');
			$('#notification-btn').css('border-top', '1px #666 solid');
			$('#profile-dd-content').css('display','none');
			$('#notification-dd-content-div').css('display','flex');
			$('#notifications-icon-numbers').css('display','none');
		} else if ($('#acc-settings-btn-div').css('background-color') == 'rgb(39, 38, 38)') {
			$('#notification-btn').css('background-color', 'rgb(39, 38, 38)');
			$('#acc-settings-btn-div').css('background-color', '#333');
			$('#account-dropdown-div').css('width', '400px');
			$('#acc-settings-btn-div').css('border-left', '');
			$('#acc-settings-btn-div').css('border-right', '');
			$('#acc-settings-btn-div').css('border-top', '');
			$('#notification-btn').css('border-left', '1px #666 solid');
			$('#notification-btn').css('border-right', '1px #666 solid');
			$('#notification-btn').css('border-top', '1px #666 solid');
			$('#profile-dd-content').css('display','none');
			$('#notification-dd-content-div').css('display','flex');
			$('#notifications-icon-numbers').css('display','none');
		} else {
			$('#notification-btn').css('background-color', '#333');
			$('#account-dropdown-div').css('height', '0');
			$('#notification-btn').css('border-left', '');
			$('#notification-btn').css('border-right', '');
			$('#notification-btn').css('border-top', '');
			$('#account-dropdown-div').css('display', 'none');
			$('#account-dropdown-div').css('width', '0');
		}
	});
	$(document).mouseup(function(e)
	{
		var elements = [$('#notification-btn'),$('#acc-settings-btn-div'),$('#account-dropdown-div')];
		if($('#account-dropdown-div').height() !== '0'){
			if(!elements[0].is(e.target) && !elements[1].is(e.target) &&!elements[2].is(e.target) && 
				elements[0].has(e.target).length === 0 && elements[1].has(e.target).length === 0 &&
				elements[2].has(e.target).length === 0){
				$('#account-dropdown-div').css('height','0');
				$('#notification-btn').css('background-color', '#333');
				$('#acc-settings-btn-div').css('background-color', '#333');
				$('#acc-settings-btn-div').css('border-left', '');
				$('#acc-settings-btn-div').css('border-right', '');
				$('#acc-settings-btn-div').css('border-top', '');
				$('#notification-btn').css('border-left', '');
				$('#notification-btn').css('border-right', '');
				$('#notification-btn').css('border-top', '');
				$('#account-dropdown-div').css('display', 'none');
				$('#account-dropdown-div').css('width', '0');
			}
		}
	});
});