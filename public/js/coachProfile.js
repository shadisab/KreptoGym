/* eslint-disable no-undef */
$(document).ready(async () => {

	$('#cancle').on('click', () => {
		if (document.referrer.indexOf('coachClients') > 0 || document.referrer.indexOf('coachHome') > 0 || document.referrer.indexOf('coachClientListForChat') > 0) {
			parent.history.back();
		} else {
			window.location.href = '/coachHome';
		}
	});

	var authCoach = await fetch('/coachs/myProfile', {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	});
	if (authCoach.status === 200) {
		authCoach.json().then((data) => {
			$('#name').text(data.name);
			$('#email').text(data.email);
			if (data.profilePic) {
				$('#profile-img').attr('src', `data:image/png;base64,${data.profilePic}`);
			}
		});
	}

	var formData = new FormData();
	$('#SaveChanges').on('click', async () => {

		console.log($('#name').text());
		formData.append('upload', file);
		formData.append('name', $('#name').text());
			
		var saveChanges = await fetch('/coachs/editProfile', {
			method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: formData
		});
		if (saveChanges.status === 200) {
			formData.delete('upload');
			formData.delete('name');
			if (document.referrer.indexOf('coachClients') > 0 || document.referrer.indexOf('coachHome') > 0) {
				parent.history.back();
			} else {
				window.location.href = '/coachHome';
			}
		}
		else {
			saveChanges.json().then((data)=>{
				console.log(data);
			});
		}
		
	});

	$('#profile-img').click(async () => {
		$('#img-upload').click();
	});

	$('#edit-text').click(async () => {
		$('#img-upload').click();
	});

	var file = undefined;
	$('#img-upload').change(function () {
		$('#profile-img').attr('src', window.URL.createObjectURL(this.files[0]));
		file = this.files[0];
	});

	$('#name-edit').click(async () => {
		var input = $('<input />', {
			'id': 'name',
			'type': 'text',
			'class': 'coachProfile-user-info-item-text',
			'value': $('#name').text()
		});
		$('#name').replaceWith(input);
		$('#name-save-btn').css('display', 'flex');
		$('#name-edit').css('display', 'none');
	});

	$('#name-save-btn').click(async () => {
		var mydiv = $('<div />', {
			id: 'name',
			class: 'coachProfile-user-info-item-text',
			text: $('#name').val()
		});
		$('#name').replaceWith(mydiv);
		$('#name-save-btn').css('display', 'none');
		$('#name-edit').css('display', 'flex');
	});

	$('#password-edit').on('click', function (event) {
		event.preventDefault();
		$('#cd-changepass-popup').addClass('is-visible2');
	});

	$('#cd-changepass-popup-close').on('click', function (event) {
		event.preventDefault();
		$('#cd-changepass-popup').removeClass('is-visible2');
		$('#passwordREQ').css('opacity', 0).text('');
		$('#newPasswordREQ').css('opacity', 0).text('');
		$('#old-password').val('');
		$('#new-password').val('');
		$('#confirm-new-password').val('');
	});
	$('#old-password').keydown(function () {
		$('#passwordREQ').css('opacity', 0);
	});
	$('#new-password').keydown(function () {
		$('#newPasswordREQ').css('opacity', 0);
	});


	$(document).keyup(function (event) {
		if (event.which == '27') {
			$('#cd-changepass-popup').removeClass('is-visible2');
			$('#passwordREQ').css('opacity', 0).text('');
			$('#newPasswordREQ').css('opacity', 0).text('');
			$('#old-password').val('');
			$('#new-password').val('');
			$('#confirm-new-password').val('');

		}
	});
	$('#popupConfirmBTN').click(async () => {
		const password = $('#old-password').val();
		const newPassword = $('#new-password').val();
		const confirmPassword = $('#confirm-new-password').val();

		if (password === '') {
			$('#passwordREQ').css('opacity', 1).text('Must enter your Current Password!');
			return;
		}

		if (newPassword === '') {
			$('#newPasswordREQ').css('opacity', 1).text('Must enter your new password!');
			return;
		}

		if (newPassword !== '' && newPassword !== confirmPassword) {
			$('#newPasswordREQ').css('opacity', 1).text('Passwords not match!');
			if (confirmPassword !== '') {
				$('#new-password').val('');
				$('#confirm-new-password').val('');
			}
			return;
		}



		if (newPassword !== '' && newPassword === confirmPassword && password !== '') {
			const updatePassword = await fetch('/coachs/password', {
				method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
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
					password,
					newPassword
				}) // body data type must match "Content-Type" header
			});
			if (updatePassword.status === 400) {
				if (newPassword === password) {
					$('#newPasswordREQ').css('opacity', 1).text('New password must not be the same as old password');
					return;
				}

				updatePassword.json().then((body) => {
					if (Object.keys(body).length === 0) {
						$('#passwordREQ').css('opacity', 1).text('The old password you have entered is incorrect!');
						return;
					}
					switch (body.errors['password'].kind) {
					case 'minlength':
						$('#newPasswordREQ').css('opacity', 1).text('Passowrd length most be > 6');
						break;
					case 'user defined':
						$('#newPasswordREQ').css('opacity', 1).text('Password must not contain \'password\'');
						break;
					}
				});
			}
			if (updatePassword.status === 200) {
				$('#successfullyREQ').css('opacity', 1);
				setTimeout(() => {
					$('#cd-changepass-popup').removeClass('is-visible2');
					$('#passwordREQ').css('opacity', 0).text('');
					$('#newPasswordREQ').css('opacity', 0).text('');
					$('#old-password').val('');
					$('#new-password').val('');
					$('#confirm-new-password').val('');
					$('#successfullyREQ').css('opacity', 0);
				}, 1500);
			}
		}
	});
});