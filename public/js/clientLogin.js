$(document).ready(async () => {
	$('#email').keyup(function () {
		$('#WLInfo').css('opacity', '0');
		$('#L-title').css('opacity', '1');
		var email = $('#email').val();
		var password = $('#password').val();
		if (email != '' && password != '') {
			$('#loginBTN').removeClass('login-btn-off');
			$('#loginBTN').addClass('login-btn');
		} else{
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
		} else{
			$('#loginBTN').removeClass('login-btn');
			$('#loginBTN').addClass('login-btn-off');
		}
	});

	$('#loginBTN').click(async () => {
		var email = $('#email').val();
		var password = $('#password').val();
		const postClient = await fetch('usersLogin', {
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

		if (postClient.status === 400 && password !== '' && email !== '') {
			console.log(postClient);
			$('#WLInfo').css('opacity', '1');
			$('#L-title').css('opacity', '0');
		}

		if (postClient.status === 200) {
			console.log('Login success');

		}
	});
});