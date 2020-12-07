$(document).ready(async () => {
	const getCoachs = await fetch('/clients/allCoachs', {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body data type must match "Content-Type" header
	});

	getCoachs.json().then((data) => {
		data.forEach(coach => {
			$('#coachs').append($('<option></option>')
				.attr('value', coach._id)
				.text(coach.name));
		});
	});

	if ($('#R-P1').css('display') === 'flex') {
		$('#back-btn').css('display', 'none');
	}

	$('#email').keyup(async () => {
		$('#c-wrong-msg').css('opacity', '0');
		$('#reg-title').css('opacity', '1');
		const email = $('#email').val();
		var mailformat = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
		if(email == ''){
			$('#email-validation-icon').css('opacity','0');
			$('#email-wrong-msg-div').css('opacity','0');
		} else if (!email.match(mailformat)){
			$('#email-validation-icon').css('opacity','1');
			$('#email-wrong-msg-div').css('opacity','1');
			$('#email-validation-icon').css('color','red');
			$('#email-validation-icon').removeClass('fa-check');
			$('#email-validation-icon').addClass('fa-times');
		} else {
			$('#email-validation-icon').removeClass('fa-times');
			$('#email-validation-icon').addClass('fa-check');
			$('#email-wrong-msg-div').css('opacity','0');
			setTimeout(function(){
				$('#email-validation-icon').css('color','green');
			},20);
		}
	});

	$('#password').keyup(async () => {
		$('#c-wrong-msg').css('opacity', '0');
		$('#reg-title').css('opacity', '1');
		const password = $('#password').val();
		var number = /([0-9])/;
		var alphabets = /([a-zA-Z])/;
		var special_characters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
		if(password == ''){
			$('#password-validation-icon').css('opacity','0');
			$('#password-wrong-msg-div').css('opacity','0');
		}else if(password.length >= 6 && password.match(number) && password.match(alphabets) && password.match(special_characters)) {
			$('#password-wrong-msg-div').css('opacity','0');
			$('#password-validation-icon').removeClass('fa-times');
			$('#password-validation-icon').addClass('fa-check');
			$('#password-validation-icon').css('color','green');
		} else if(password.length >= 6 && password.match(number) && password.match(alphabets)) {
			$('#password-wrong-msg-div').css('opacity','0');
			$('#password-validation-icon').removeClass('fa-times');
			$('#password-validation-icon').addClass('fa-check');
			$('#password-validation-icon').css('color','green');
		} else if(password.length >= 6 && password.match(special_characters) && password.match(alphabets)) {
			$('#password-wrong-msg-div').css('opacity','0');
			$('#password-validation-icon').removeClass('fa-times');
			$('#password-validation-icon').addClass('fa-check');
			$('#password-validation-icon').css('color','green');
		} else if(password.length < 6){
			$('#password-wrong-msg-div').css('opacity','1');
			var obj = $('#password-wrong-msg').text('Password too short! \n Length must be 6 or above.');
			obj.html(obj.html().replace(/\n/g,'<br/>'));
			$('#password-validation-icon').css('opacity','1');
			$('#password-validation-icon').removeClass('fa-check');
			$('#password-validation-icon').addClass('fa-times');
			$('#password-validation-icon').css('color','red');
		} else {
			$('#password-wrong-msg-div').css('opacity','1');
			$('#password-wrong-msg').text('Password must contain letters and numbers/special characters!');
			$('#password-validation-icon').css('opacity','1');
			$('#password-validation-icon').removeClass('fa-check');
			$('#password-validation-icon').addClass('fa-times');
			$('#password-validation-icon').css('color','red');
		}
		const confirmPassword = $('#confirmPassword').val();
		if(password == confirmPassword) {
			$('#Confirmpassword-validation-icon').removeClass('fa-times');
			$('#Confirmpassword-validation-icon').addClass('fa-check');
			$('#Confirmpassword-validation-icon').css('color','green');
			$('#CPassword-wrong-msg-div').css('opacity','0');
		} else if(password != confirmPassword && confirmPassword != '') {
			$('#Confirmpassword-validation-icon').css('opacity','1');
			$('#CPassword-wrong-msg-div').css('opacity','1');
			$('#Confirmpassword-validation-icon').removeClass('fa-check');
			$('#Confirmpassword-validation-icon').addClass('fa-times');
			$('#Confirmpassword-validation-icon').css('color','red');
		}
	});


	$('#confirmPassword').keyup(async () => {
		$('#c-wrong-msg').css('opacity', '0');
		$('#reg-title').css('opacity', '1');
		const password = $('#password').val();
		const confirmPassword = $('#confirmPassword').val();
		if(confirmPassword == ''){
			$('#Confirmpassword-validation-icon').css('opacity','0');
			$('#CPassword-wrong-msg-div').css('opacity','0');
		} else if(password == confirmPassword) {
			$('#Confirmpassword-validation-icon').removeClass('fa-times');
			$('#Confirmpassword-validation-icon').addClass('fa-check');
			$('#Confirmpassword-validation-icon').css('color','green');
			$('#CPassword-wrong-msg-div').css('opacity','0');
		}
		else {
			$('#Confirmpassword-validation-icon').css('opacity','1');
			$('#CPassword-wrong-msg-div').css('opacity','1');
			$('#Confirmpassword-validation-icon').removeClass('fa-check');
			$('#Confirmpassword-validation-icon').addClass('fa-times');
			$('#Confirmpassword-validation-icon').css('color','red');
		}
	});


	$('#next-btn').click(async () => {
		if ($('#R-P1').css('display') === 'flex') {
			if($('#email-validation-icon').hasClass('fa-times') ||
			$('#Confirmpassword-validation-icon').hasClass('fa-times') ||
			$('#password-validation-icon').hasClass('fa-times')){
				$('#c-wrong-msg').css('opacity','1');
				$('#reg-title').css('opacity', '0');
				$('#email').val('');
				$('#password').val('');
				$('#confirmPassword').val('');
				$('#Confirmpassword-validation-icon').css('opacity','0');
				$('#CPassword-wrong-msg-div').css('opacity','0');
				$('#password-validation-icon').css('opacity','0');
				$('#password-wrong-msg-div').css('opacity','0');
				$('#email-validation-icon').css('opacity','0');
				$('#email-wrong-msg-div').css('opacity','0');
				setTimeout(function(){
					$('#c-wrong-msg').css('opacity','0');
					$('#reg-title').css('opacity', '1');
				},3000);
			} else {
				$('#R-P1').css('width', '30%');
				$('#R-P1').css('opacity', '0');
				setTimeout(function () {
					$('#R-P1').css('display', 'none');
					$('#R-P2').css('display', 'flex');
					$('#back-btn').css('display', 'flex');
				}, 400);
				setTimeout(function () {
					$('#back-btn').css('width', '10%');
					$('#back-btn').css('opacity', '1');
					$('#back-btn').css('margin-right', '100px');
					$('#dot1').css('color', '#999');
					$('#dot2').css('color', 'black');
					$('#R-P2').css('opacity', '1');
					$('#R-P2').css('width', '65%');
				}, 420);
			}
		} else if ($('#R-P2').css('display') === 'flex') {
			$('#R-P2').css('width', '30%');
			$('#R-P2').css('opacity', '0');
			setTimeout(function () {
				$('#R-P2').css('display', 'none');
				$('#R-P3').css('display', 'flex');
			}, 400);
			setTimeout(function () {
				$('#dot2').css('color', '#999');
				$('#dot3').css('color', 'black');
				$('#R-P3').css('opacity', '1');
				$('#R-P3').css('width', '65%');
			}, 420);
		} else if ($('#R-P3').css('display') === 'flex') {
			$('#R-P3').css('width', '30%');
			$('#R-P3').css('opacity', '0');
			setTimeout(function () {
				$('#R-P3').css('display', 'none');
				$('#R-P4').css('display', 'flex');
			}, 400);
			setTimeout(function () {
				$('#next-btn').css('width', '0');
				$('#next-btn').css('opacity', '0');
				$('#back-btn').css('margin-right', '0');
				$('#dot3').css('color', '#999');
				$('#dot4').css('color', 'black');
				$('#R-P4').css('opacity', '1');
				$('#R-P4').css('width', '65%');
			}, 420);
			setTimeout(function () {
				$('#next-btn').css('display', 'none');
				$('#finish-btn').css('display', 'flex');
				$('#back-btn').css('margin-right', '100px');
			}, 820);
			setTimeout(function () {
				$('#finish-btn').css('opacity', '1');
				$('#finish-btn').css('width', '10%');
			}, 1200);
		}
	});
	$('#back-btn').click(async () => {
		if ($('#R-P2').css('display') === 'flex') {
			$('#R-P2').css('width', '30%');
			$('#R-P2').css('opacity', '0');
			setTimeout(function () {
				$('#R-P2').css('display', 'none');
				$('#R-P1').css('display', 'flex');
			}, 400);
			setTimeout(function () {
				$('#back-btn').css('width', '0');
				$('#back-btn').css('opacity', '0');
				$('#back-btn').css('margin-right', '20px');
				$('#dot1').css('color', 'black');
				$('#dot2').css('color', '#999');
				$('#R-P1').css('opacity', '1');
				$('#R-P1').css('width', '65%');
			}, 420);
			setTimeout(function () {
				$('#back-btn').css('display', 'none');
			}, 820);
		} else if ($('#R-P3').css('display') === 'flex') {
			$('#R-P3').css('width', '30%');
			$('#R-P3').css('opacity', '0');
			setTimeout(function () {
				$('#R-P3').css('display', 'none');
				$('#R-P2').css('display', 'flex');
			}, 400);
			setTimeout(function () {
				$('#dot2').css('color', 'black');
				$('#dot3').css('color', '#999');
				$('#R-P2').css('opacity', '1');
				$('#R-P2').css('width', '65%');
			}, 420);
		} else if ($('#R-P4').css('display') === 'flex') {
			$('#R-P4').css('width', '30%');
			$('#R-P4').css('opacity', '0');
			setTimeout(function () {
				$('#R-P4').css('display', 'none');
				$('#R-P3').css('display', 'flex');
			}, 400);
			setTimeout(function () {
				$('#finish-btn').css('width', '0');
				$('#finish-btn').css('opacity', '0');
				$('#back-btn').css('margin-right', '0');
				$('#dot3').css('color', 'black');
				$('#dot4').css('color', '#999');
				$('#R-P3').css('opacity', '1');
				$('#R-P3').css('width', '65%');
			}, 420);
			setTimeout(function () {
				$('#finish-btn').css('display', 'none');
				$('#next-btn').css('display', 'flex');
				$('#back-btn').css('margin-right', '100px');
			}, 820);
			setTimeout(function () {
				$('#next-btn').css('opacity', '1');
				$('#next-btn').css('width', '10%');
			}, 1200);
		}
	});
	$('#profile-img').click(async () => {
		$('#img-upload').click();
	});

	$('#edit-text').click(async () => {
		$('#img-upload').click();
	});

	function fasterPreview(uploader) {
		if (uploader.files && uploader.files[0]) {
			$('#profile-img').attr('src',
				window.URL.createObjectURL(uploader.files[0]));
		}
	}

	$('#img-upload').change(function () {
		fasterPreview(this);
	});
});