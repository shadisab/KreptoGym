$(document).ready(async () => {

	$('#name').keydown(function () {
		$('#nameREQ').css('opacity', 0);
	});

	$('#email').keydown(function () {
		$('#emailREQ').css('opacity', 0);
	});

	$('#password').keydown(function () {
		$('#passwordREQ').css('opacity', 0);
		$('#ERRmatchPASS').css('opacity', 0);
	});

	$('#confirmPassword').keydown(function () {
		$('#ERRmatchPASS').css('opacity', 0);
	});

	$('#clientREG').click(async () => {
		const name = $('#name').val();
		const email = $('#email').val();
		const password = $('#password').val();

		const confirmPassword = $('#confirmPassword').val();
		if (password !== '' && confirmPassword !== password) { $('#ERRmatchPASS').css('opacity', 1); }
        
		if(password === confirmPassword){
			const postCoach = await fetch('/coachs/signup', {
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
					email,
					password,
					userType: 'coach'
				}) // body data type must match "Content-Type" header
			});

			if (postCoach.status === 400) {
				postCoach.json().then((body) => {
					console.log(body);
					/*     If the response message is Required           */
					if (body.errors['name']) {
						if (body.errors['name'].kind === 'required') { $('#nameREQ').css('opacity', 1); }
					}

					if (body.errors['email']) {
						if (body.errors['email'].kind === 'required') { $('#emailREQ').css('opacity', 1); }
						if (body.errors['email'].kind === 'user defined') { $('#emailREQ').text('Please enter a valid Email address').css('opacity', 1); }
					}

					if (body.errors['password']) {
						if (body.errors['password'].kind === 'required') { $('#passwordREQ').css('opacity', 1); }
						if (body.errors['password'].kind === 'minlength') { $('#passwordREQ').text('Passowrd length most be > 6').css('opacity', 1); }
						if (body.errors['password'].kind === 'user defined') { $('#passwordREQ').text('Password must not contain "password"').css('opacity', 1); }
					}
                 
					/*     IF the response message is Must be positive        */
				});
			}
			if (postCoach.status === 201) {
				window.location.href = ('/coachClients');
			}
		}
	});
});