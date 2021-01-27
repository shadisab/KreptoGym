$(document).ready(async () => {
	/****************** Upload Resume ****************/
	$('#file-upload-icon').click(async () => {
		$('#resume-upload').click();
	});
	let temp = false;
	let file = undefined;
	$('#resume-upload').change(function () {
		$('#file-uploaded-name').text(this.files[0].name);
		file = this.files[0];
		temp = this.files !== undefined;
	});
	$('#Email').keyup(async () => {
		$('#UsedEmailaddress').css('opacity', 0);
	});

	let formData = new FormData();
	$('#regBTN').click(async () => {

		const name = $('#Name').val();
		const email = $('#Email').val();
		if (name !== '' && email !== '' && temp !== false) {

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
			if (CheckEmailAddress.status === 409) {
				$('#UsedEmailaddress').css('opacity', 1);
			}
			else if (CheckEmailAddress.status === 200) {
				formData.append('upload', file);
				formData.append('email', email);
				formData.append('name', name);
				const regCoach = await fetch('/coachsignup', {
					method: 'POST', // *GET, POST, PUT, DELETE, etc.
					mode: 'cors', // no-cors, *cors, same-origin
					cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
					credentials: 'same-origin', // include, *same-origin, omit
					redirect: 'follow', // manual, *follow, error
					referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
					body: formData
				});

				//Manual deleting cuz for or foreach in formdata.delete want work as expected
				formData.delete('upload');
				formData.delete('email');
				formData.delete('name');
				if (regCoach.status === 201) {
					console.log('Success');
				} else {
					console.log('Return the error that the server is return.');
				}
			}
		}
		else {
			console.log('ERROR LOGIN');
		}
	});
});