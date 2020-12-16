$(document).ready(async () => {

	/* GET the Passed id URL Parameter Values */
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const id = urlParams.get('id');
	/************/

	/*GET Coach data */
	const coachData = await fetch('/BOcoachView/' + id + '/profile', {
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
	/* GET Coach Termination Certificate */
	const terCer = await fetch('/coaches/' + id + '/TerminationCertificate', {
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

	if (coachData.status === 200) {
		coachData.json().then((data) => {
			$('#name').val(data.name);
			$('#email').val(data.email);
			$('#date').val(data.createdAt.toString().substring(0, 10));
			$('#status').val(data.status);

			if (data.status === 'Accepted') {
				$('#BTNSConfirmation').removeAttr('style').hide();
			}
			else if (data.status === 'Testing') {
				/************* Confirm Button **********/
				$('#AcceptBTN').click(() => {
					$('#myModal-confirm').show();
				});
				$('#closeX-confirm').click(() => {
					$('#myModal-confirm').removeAttr('style').hide();
				});
				$('#notBTN-confirm').click(() => {
					$('#myModal-confirm').removeAttr('style').hide();
				});
				$('#yesBTN-confirm').click( async() => {
					/*UPDATE Coach data */
					const  acceptCoach = await fetch('/coachs/' + id, {
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
						// body data type must match "Content-Type" header
						body: JSON.stringify({
							status: 'Accepted'
						})
					});
					if(acceptCoach.status === 200){
						$('#myModal-confirm').removeAttr('style').hide();
						setTimeout(() => {
							location.reload(true);
						}, 500);
					}
					else {
						// eslint-disable-next-line quotes
						alert("Something went wrong, couldn't accept coach");
						console.log(acceptCoach);
					}
				});
				/********* Reject Button *********/
				$('#RejectBTN').click(() => {
					$('#myModal-reject').show();
				});
				$('#closeX-reject').click(() => {
					$('#myModal-reject').removeAttr('style').hide();
				});
				$('#notBTN-reject').click(() => {
					$('#myModal-reject').removeAttr('style').hide();
				});
				$('#yesBTN-reject').click( async () => {
					/*DELETE Coach*/
					const  RejectCoach = await fetch('/coach/delete/' + id, {
						method: 'DELETE',
						mode: 'cors', // no-cors, *cors, same-origin
						cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
						credentials: 'same-origin', // include, *same-origin, omit
						headers: {
							'Content-Type': 'application/json'
							// 'Content-Type': 'application/x-www-form-urlencoded',
						},
						redirect: 'follow', // manual, *follow, error
						referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
					});
                    
					if(RejectCoach.status === 200){
						$('#myModal-confirm').removeAttr('style').hide();
						setTimeout(() => {
							window.location.replace('/backoffice');

						}, 500);
					}
					else{
						$('#myModal-confirm').removeAttr('style').hide();
						alert('Something went wrong, couldnt delete the coach.');
					}
				});
			}
		});
	}
	if (terCer.status === 200) {
		$('#Terimg').attr('src', terCer.url);
		$('#Termination-Certificate').click(() => {
			$('#myModal').show();
		});
		$('#closeX').click(() => {
			$('#myModal').removeAttr('style').hide();
		});
	}

	if (terCer.status !== 200) {
		$('#AcceptBTN').attr('disabled', 'disabled');
		$('#ExplainMSG').empty().text('Accidentally, This user is not uploaded image for his Termination-Certificate.').css('color', 'red');
		$('#Termination-Certificate').click(() => {
			alert('User didnt uploade Termination-Certificate image');
		});
	}


	/* Marking the day of today */
});