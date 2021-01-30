$(document).ready(async () => {
	
	
	var authCoach = await fetch('/coachs/myProfile', {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmZiNzViOGM3MTc0NTRkYTQ2YTBkOWQiLCJpYXQiOjE2MTE1OTg3OTN9.QpP4iCDH1FYMLRWGoZYmbVsVhAzoxRM7u9_ykey3kPE',
			'Cookie': 'Authorization=Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmZiNzViOGM3MTc0NTRkYTQ2YTBkOWQiLCJpYXQiOjE2MTE1OTg3OTN9.QpP4iCDH1FYMLRWGoZYmbVsVhAzoxRM7u9_ykey3kPE'
		}
	});
	if(authCoach.status === 200){
		authCoach.json().then(async (data) => {
			$('#Name').val(data.name);
		});
	}
	
	
	
	
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

	var formData = new FormData();
	$('#regBTN').on('click', async () => {
		if ($('#Name').val() === '') {
			alert('Name should be filed');
		} else if ($('#password').val() === '') {
			alert('Passwords should be filed');
		} else if ($('#password').val() !== $('#passwordconfirm').val()) {
			alert('Passwords should be the same');
		} else {
			formData.append('upload', file);
			formData.append('name', $('#Name').val());
			formData.append('password', $('#password').val());
			formData.append('aboutMe', $('#aboutMe').val());
			
			var saveChanges = await fetch('/coachsignupV2', {
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
				formData.delete('password');
				formData.delete('aboutMe');
				window.location.href = '/coachHome';
			}
			else {
				saveChanges.json().then((data)=>{
					console.log(data);
				});
			}
		}
	});
});