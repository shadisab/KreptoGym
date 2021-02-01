/* eslint-disable no-undef */
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

	var today = new Date();
	var minDate = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}

	today = (yyyy - 18) + '-' + mm + '-' + dd;
	minDate = (yyyy - 120) + '-' + mm + '-' + dd;
	$('#Birthdate').attr('max', today);
	$('#Birthdate').attr('min', minDate);

	if ($('#R-P1').css('display') === 'flex') {
		$('#back-btn').css('display', 'none');
	}

	$('#email').keyup(async () => {
		$('#UsedEmailaddress').css('opacity', 0).hide();
		$('#c-wrong-msg').css('opacity', '0');
		$('#reg-title').css('opacity', '1');
		const email = $('#email').val();
		// eslint-disable-next-line no-useless-escape
		var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (email == '') {
			$('#email-validation-icon').css('opacity', '0');
			$('#email-wrong-msg-div').css('opacity', '0');
		} else if (!email.match(mailformat)) {
			$('#email-validation-icon').css('opacity', '1');
			$('#email-wrong-msg-div').css('opacity', '1').html('<p class="invaild-email-msg">Email format must be:</br> example@example.domain</p><div class="little-arrow-left"></div>');
			$('#email-validation-icon').css('color', 'red');
			$('#email-validation-icon').removeClass('fa-check');
			$('#email-validation-icon').addClass('fa-times');
		} else {
			$('#email-validation-icon').removeClass('fa-times');
			$('#email-validation-icon').addClass('fa-check');
			$('#email-wrong-msg-div').css('opacity', '0');
			setTimeout(function () {
				$('#email-validation-icon').css('color', 'green');
			}, 20);
		}
	});

	$('#password').keyup(async () => {
		$('#c-wrong-msg').css('opacity', '0');
		$('#reg-title').css('opacity', '1');
		const password = $('#password').val();
		var number = /([0-9])/;
		var alphabets = /([a-zA-Z])/;
		var special_characters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
		if (password == '') {
			$('#password-validation-icon').css('opacity', '0');
			$('#password-wrong-msg-div').css('opacity', '0');
		} else if (password.length >= 7 && password.match(number) && password.match(alphabets) && password.match(special_characters)) {
			$('#password-wrong-msg-div').css('opacity', '0');
			$('#password-validation-icon').removeClass('fa-times');
			$('#password-validation-icon').addClass('fa-check');
			$('#password-validation-icon').css('color', 'green');
		} else if (password.length >= 7 && password.match(number) && password.match(alphabets)) {
			$('#password-wrong-msg-div').css('opacity', '0');
			$('#password-validation-icon').removeClass('fa-times');
			$('#password-validation-icon').addClass('fa-check');
			$('#password-validation-icon').css('color', 'green');
		} else if (password.length >= 7 && password.match(special_characters) && password.match(alphabets)) {
			$('#password-wrong-msg-div').css('opacity', '0');
			$('#password-validation-icon').removeClass('fa-times');
			$('#password-validation-icon').addClass('fa-check');
			$('#password-validation-icon').css('color', 'green');
		} else if (password.length < 7) {
			$('#password-wrong-msg-div').css('opacity', '1');
			var obj = $('#password-wrong-msg').text('Password too short! \n Length must be 6 or above.');
			obj.html(obj.html().replace(/\n/g, '<br/>'));
			$('#password-validation-icon').css('opacity', '1');
			$('#password-validation-icon').removeClass('fa-check');
			$('#password-validation-icon').addClass('fa-times');
			$('#password-validation-icon').css('color', 'red');
		} else {
			$('#password-wrong-msg-div').css('opacity', '1');
			$('#password-wrong-msg').text('Password must contain letters and numbers/special characters!');
			$('#password-validation-icon').css('opacity', '1');
			$('#password-validation-icon').removeClass('fa-check');
			$('#password-validation-icon').addClass('fa-times');
			$('#password-validation-icon').css('color', 'red');
		}
		const confirmPassword = $('#confirmPassword').val();
		if (password == confirmPassword) {
			$('#Confirmpassword-validation-icon').removeClass('fa-times');
			$('#Confirmpassword-validation-icon').addClass('fa-check');
			$('#Confirmpassword-validation-icon').css('color', 'green');
			$('#CPassword-wrong-msg-div').css('opacity', '0');
		} else if (password != confirmPassword && confirmPassword != '') {
			$('#Confirmpassword-validation-icon').css('opacity', '1');
			$('#CPassword-wrong-msg-div').css('opacity', '1');
			$('#Confirmpassword-validation-icon').removeClass('fa-check');
			$('#Confirmpassword-validation-icon').addClass('fa-times');
			$('#Confirmpassword-validation-icon').css('color', 'red');
		}
	});


	$('#confirmPassword').keyup(async () => {
		$('#c-wrong-msg').css('opacity', '0');
		$('#reg-title').css('opacity', '1');
		const password = $('#password').val();
		const confirmPassword = $('#confirmPassword').val();
		if (confirmPassword == '') {
			$('#Confirmpassword-validation-icon').css('opacity', '0');
			$('#CPassword-wrong-msg-div').css('opacity', '0');
		} else if (password == confirmPassword) {
			$('#Confirmpassword-validation-icon').removeClass('fa-times');
			$('#Confirmpassword-validation-icon').addClass('fa-check');
			$('#Confirmpassword-validation-icon').css('color', 'green');
			$('#CPassword-wrong-msg-div').css('opacity', '0');
		}
		else {
			$('#Confirmpassword-validation-icon').css('opacity', '1');
			$('#CPassword-wrong-msg-div').css('opacity', '1');
			$('#Confirmpassword-validation-icon').removeClass('fa-check');
			$('#Confirmpassword-validation-icon').addClass('fa-times');
			$('#Confirmpassword-validation-icon').css('color', 'red');
		}
	});

	$('#height').keyup(async () => {
		var H = $('#height').val();
		H = parseInt(H);
		if (H < 0) {
			console.error('height must be pos');
		}
	});

	$('#weight').keyup(async () => {
		var W = $('#weight').val();
		W = parseInt(W);
		if (W < 0) {
			console.error('weight must be pos');
		}
	});


	$('#next-btn').click(async () => {
		if ($('#R-P1').css('display') === 'flex') {
			if ($('#email-validation-icon').hasClass('fa-times') ||
				$('#Confirmpassword-validation-icon').hasClass('fa-times') ||
				$('#password-validation-icon').hasClass('fa-times')) {
				$('#c-wrong-msg').css('opacity', '1');
				$('#reg-title').css('opacity', '0');
				$('#email').val('');
				$('#password').val('');
				$('#confirmPassword').val('');
				$('#Confirmpassword-validation-icon').css('opacity', '0');
				$('#CPassword-wrong-msg-div').css('opacity', '0');
				$('#password-validation-icon').css('opacity', '0');
				$('#password-wrong-msg-div').css('opacity', '0');
				$('#email-validation-icon').css('opacity', '0');
				$('#email-wrong-msg-div').css('opacity', '0');
				setTimeout(function () {
					$('#c-wrong-msg').css('opacity', '0');
					$('#reg-title').css('opacity', '1');
				}, 3000);
			} else {
				$('#email-validation-icon').removeClass('fa-check');
				$('#email-validation-icon').addClass('loader');
				setTimeout(async () => {
					let email = $('#email').val();
					/*********** Testing if the email exist in the DB  **********/
					const CheckEmailAddress = await fetch('/ClientsCoachesCheck', {
						method: 'POST', // *GET, POST, PUT, DELETE, etc.
						mode: 'cors', // no-cors, *cors, same-origin
						cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
						credentials: 'same-origin', // include, *same-origin, omit
						redirect: 'follow', // manual, *follow, error
						referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
						headers: {
							'Content-Type': 'application/json'
							// 'Content-Type': 'application/x-www-form-urlencoded',
						},
						body: JSON.stringify(
							{
								email
							})
					});
					if (CheckEmailAddress.status === 200) {
						$('#email-validation-icon').removeClass('loader');
						$('#email-validation-icon').addClass('fa-check');
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
					else if (CheckEmailAddress.status === 409) {
						$('#email-validation-icon').removeClass('loader');
						$('#email-validation-icon').addClass('fa-times');
						$('#email-validation-icon').css('color', 'red');
						$('#email-wrong-msg-div').css('opacity', '1').html('<p class="invaild-email-msg">Used Email addrees, Please try another one.</p><div class="little-arrow-left"></div>');
						$('#UsedEmailaddress').css('opacity', 1).show();
					}
				}, 1800);
			}

		} else if ($('#R-P2').css('display') === 'flex') {
			// Check if all the inputs is filled
			if (!$('#Fname').val() || !$('#Gender').val() || !$('#Birthdate').val() || !$('#height').val() || !$('#weight').val() || !$('#country-select').val()) {
				$('#FillAll-errmsg').css('opacity', '1');
				$('#reg-title2').css('opacity', '0');
				setTimeout(function () {
					$('#FillAll-errmsg').css('opacity', '0');
					$('#reg-title2').css('opacity', '1');
				}, 3000);
			}
			else if(!allCharacters($('#Fname').val())){
				$('#invalid-name-errmsg').css('opacity', '1');
				$('#reg-title2').css('opacity', '0');
				setTimeout(function () {
					$('#invalid-name-errmsg').css('opacity', '0');
					$('#reg-title2').css('opacity', '1');
				}, 3000);
			}
			else if(diff_years($('#Birthdate').val()) < 18 || diff_years($('#Birthdate').val()) > 120) {
				$('#AgeValidation-errmsg').css('opacity', '1');
				$('#reg-title2').css('opacity', '0');
				setTimeout(function () {
					$('#AgeValidation-errmsg').css('opacity', '0');
					$('#reg-title2').css('opacity', '1');
				}, 3000);
			}
			else if($('#height').val() < 0 || $('#height').val() > 300) {
				$('#height-errmsg').css('opacity', '1');
				$('#reg-title2').css('opacity', '0');
				setTimeout(function () {
					$('#height-errmsg').css('opacity', '0');
					$('#reg-title2').css('opacity', '1');
				}, 3000);
			}
			else if($('#weight').val() < 0 || $('#weight').val() > 500) {
				$('#weight-errmsg').css('opacity', '1');
				$('#reg-title2').css('opacity', '0');
				setTimeout(function () {
					$('#weight-errmsg').css('opacity', '0');
					$('#reg-title2').css('opacity', '1');
				}, 3000);
			}
			else {
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
			}
		} else if ($('#R-P3').css('display') === 'flex') {
			$('#R-P3').css('width', '30%');
			$('#R-P3').css('opacity', '0');
			setTimeout(function () {
				getCoachs.json().then((data) => {
					data.forEach(coach => {
						if(coach.profilePic === undefined)
						{
							$('#CoachesList').append( `<div class="R-coach" id="${coach._id}">
							<img value="${coach._id}" src="/images/f0a64e32194d341befecc80458707565.jpg"/>
							<div value="${coach._id}" class="R-coach-info-div">
							<div value="${coach._id}" class="R-coach-name-div"> ${coach.name}</div>
							<div value="${coach._id}" class="R-coach-message-div">${coach.aboutMe}</div>
							</div>`);
						
						}
						else {
							$('#CoachesList').append( `<div class="R-coach" id="${coach._id}">
						<img value="${coach._id}" src="data:image/png;base64,${coach.profilePic}"/>
						<div value="${coach._id}" class="R-coach-info-div">
						<div value="${coach._id}" class="R-coach-name-div"> ${coach.name}</div>
						<div value="${coach._id}" class="R-coach-message-div">${coach.aboutMe}</div>
						</div>`);
						}
					});                                           
				});
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
	// let chosedCoachID = undefined;
	// $( '.R-coach' ).each(function() {
	// 	$(document).on('click','#CoachesList', function(){
	// 		console.log(this.id);
	// 		if(chosedCoachID === undefined){
	// 			$('#' + this.id).css('border', '3px blue solid');
	// 			chosedCoachID = this.id;
	
	// 		}
	// 		else if(chosedCoachID != this.id) {
	// 			$('#' + chosedCoachID).css('border', '1px black solid');
	// 			chosedCoachID = this.id;
	// 			$('#' + this.id).css('border', '3px blue solid');
	// 		}
	// 		else {
	// 			$('#' + this.id).css('border', '1px black solid');
	// 			chosedCoachID = undefined;
	// 		}
	// 	});
	// });

	let chosedCoachID = undefined;
	$('#CoachesList').click(async function (e) {
		if(chosedCoachID === undefined){
			$('#' + e.target.getAttribute('value')).css('border', '3px blue solid');
			chosedCoachID = e.target.getAttribute('value');
		}
		else if(chosedCoachID != e.target.getAttribute('value')) {
			$('#' + chosedCoachID).css('border', '1px black solid');
			chosedCoachID = e.target.getAttribute('value');
			$('#' + e.target.getAttribute('value')).css('border', '3px blue solid');
		}
		else {
			$('#' + e.target.getAttribute('value')).css('border', '1px black solid');
			chosedCoachID = undefined;
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
	// let temp = false;
	let file = undefined;
	$('#img-upload').change(function () {
		$('#profile-img').attr('src', window.URL.createObjectURL(this.files[0]));
		file = this.files[0];
		// temp = this.files !== undefined;
	});

	let formData = new FormData();
	$('#finish-btn').click(async () => {

		if (chosedCoachID === undefined) {
			$('#CoachNotSelected-errmsg').css('opacity', '1');
			$('#reg-title4').css('opacity', '0');
			setTimeout(function () {
				$('#CoachNotSelected-errmsg').css('opacity', '0');
				$('#reg-title4').css('opacity', '1');
			}, 3000);
		} else {

			formData.append('upload', file);
			formData.append('email', $('#email').val());
			formData.append('password', $('#password').val());
			formData.append('name', $('#Fname').val());
			formData.append('country', $('#country-select').val());
			formData.append('gender', $('#Gender').val());
			formData.append('weight', $('#weight').val());
			formData.append('height', $('#height').val());
			formData.append('coachID', chosedCoachID);
			formData.append('birthDate', moment($('#Birthdate').val()).format('YYYY-MM-DD'));

			const regClient = await fetch('/clients/signup', {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				redirect: 'follow', // manual, *follow, error
				referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				body: formData
			});
			formData.delete('upload');
			formData.delete('email');
			formData.delete('password');
			formData.delete('name');
			formData.delete('country');
			formData.delete('gender');
			formData.delete('weight');
			formData.delete('height');
			formData.delete('coachID');
			formData.delete('birthDate');

			if (regClient.status === 201) {
				window.location.replace('/clientHome');
			} else {
				console.log('Wrong REG');
			}
			// console.log('email ' + $('#email').val() + '\n', 'password' + $('#password').val() + '\n', 'Full Name:' + $('#Fname').val() + '\n',
			// 	'country: ' + $('#country-select').val() + '\n', 'Gender: ' + $('#Gender').val() + '\n', 'height: ' + $('#height').val() + '\n',
			// 	'Birthdate:' + $('#Birthdate').val() + '\n', 'weight: ' + $('#weight').val() + '\n', 'file: ' + file + '\n',
			// 	'Coach: ' + chosedCoachID + '\n');
		}
	});

	function diff_years(dt2) {
		let dt1 = new Date();
		let dt3 = new Date(dt2);
		let dd = dt1.getDate();
		let mm = dt1.getMonth() + 1;

		let yyyy = dt1.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		let today = yyyy + '-' + mm + '-' + dd;
		dt1 = new Date(today);

		let diff = (dt1.getTime() - dt3.getTime()) / 1000;
		diff /= (60 * 60 * 24);
		return Math.floor(((diff / 365.25)));
	}

	function allCharacters(myString) {
		return /^[ a-zA-Z]+$/.test(myString);
	}
});

