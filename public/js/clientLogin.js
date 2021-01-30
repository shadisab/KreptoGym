$(document).ready(async () => {
	$('#email').keyup(function () {
		$('#WLInfo').css('opacity', '0');
		$('#L-title').css('opacity', '1');
		var email = $('#email').val();
		var password = $('#password').val();
		if (email != '' && password != '') {
			$('#loginBTN').removeClass('login-btn-off');
			$('#loginBTN').addClass('login-btn');
		} else {
			$('#loginBTN').removeClass('login-btn');
			$('#loginBTN').addClass('login-btn-off');
		}
	});
	$('#password').keyup(function () {
		$('#WLInfo').css('opacity', '0');
		$('#L-title').css('opacity', '1');
		var email = $('#email').val();
		var password = $('#password').val();
		if (email != '' && password != '') {
			$('#loginBTN').removeClass('login-btn-off');
			$('#loginBTN').addClass('login-btn');
		} else {
			$('#loginBTN').removeClass('login-btn');
			$('#loginBTN').addClass('login-btn-off');
		}
	});

	$('#loginBTN').click(async () => {
		var email = $('#email').val();
		var password = $('#password').val();
		const userlog = await fetch('/usersLogin', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify({
				email,
				password
			}) // body data type must match "Content-Type" header
		});

		if (userlog.status === 400 && password !== '' && email !== '') {
			console.log(userlog);
			$('#WLInfo').css('opacity', '1');
			$('#L-title').css('opacity', '0');
		}

		if (userlog.status === 200) {
			var userType;
			var firstLogin = false;
			await userlog.json().then((data) => {
				userType = (Object.keys(data)[0]);
				if (userType === 'coach') {
					if (data.coach.firstLogin === 'false') {
						firstLogin = true;
						console.log(firstLogin);
					}
				}
			});
			if (firstLogin === true) {
				console.log(firstLogin);
				window.location.replace('/coachRegisterV2');
			}
			else{
				window.location.replace(`/${userType}Home`);
			}

		}
	});
});