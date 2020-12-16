$(document).ready(async () => {

	/*$('#email').keypress(function () {
		$('#emailREQ').css('opacity', 0);
	});

	$('#password').keypress(function () {
		$('#passwordREQ').css('opacity', 0);
		$('#emailREQ').css('opacity', 0);
	});*/

	$('#loginBTN').click(async () => {

		const name = $('#adminUsername').val();
		//if (userName === '') { $('#emailREQ').text('Please Enter your Email').css('opacity', 1); }

		const password = $('#adminPass').val();
		//if (password === '') { $('#passwordREQ').text('Please Enter your Password').css('opacity', 1); }

		const postAdmin = await fetch('/admin/login', {
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
				name,
				password
			}) // body data type must match "Content-Type" header
		});

		if (postAdmin.status === 400 && password !== '' && name !== '') {
			// { $('#emailREQ').text('Please Enter a valid Email address and Password').css('opacity', 1); }
		}

		if (postAdmin.status === 200) {
			window.location.href = ('/backoffice');

		}
	});
});