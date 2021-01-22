$(document).ready(async () => {

	$('#chat').on('click', () => {
		window.location.href = ('/joinChat');
	});

	$('#logout').on('click', async () => {
		const logout = await fetch('/coachs/logout', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		});

		if (logout.status === 200) {
			window.location.replace('/');
		}
		if (logout.status === 500) {
			console.log('Problem with log out.');
		}
	});




	const authCoach = await fetch('/coachs/myProfile', {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	const newClientsReq = await fetch('/coaches/reqClients', {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	newClientsReq.json().then((data) => {

		var numOfrequests = data.length;
		data.forEach((clientReq) => {
			$('#notification-dd-content').append(
				`<div id=${clientReq.id} class="CNS-notifiction-div">
					<div class="CNS-notification-client-profile-pic-div">
						<img src="data:image/png;base64,${clientReq.profilePic}" class="CNS-notification-client-profile-pic"/>
					</div>
					<div class="CNS-notification-info">
						<div class="CNS-notification-client-name">${clientReq.name}</div>
						<div class="CNS-notification-message">${clientReq.name} has selected you as his coach , do you accept?</div>
						<button class="CNS-notficiation-client-accept-btn">
							<i class="CNS-notficiation-client-accept-btn-icon fas fa-check"></i>
						</button>
						<button class="CNS-notficiation-client-decline-btn">
							<i class="CNS-notficiation-client-decline-btn-icon fas fa-times"></i>
						</button>
					</div>
				</div>`
			);
		});
		$('#notifications-icon-number').text(numOfrequests);
		if(numOfrequests > 0){
			$('#notifications-icon-number-div').css('display','flex');
		}
	});

	authCoach.json().then((data) => {
		var CoachName = data.name;
		var CoachEmail = data.email;
		$('#name').text(CoachName);
		$('#email').text(CoachEmail);
	});

	$('#sidebar-open-close').click(() => {
		if ($('#Sidenav').width() == '0') {
			$('#Sidenav').css('width', '250px');
		} else {
			$('#Sidenav').css('width', '0');
		}
	});
	$('#acc-settings-btn-div').click(() => {
		if ($('#account-dropdown-div').height() == '0') {
			$('#acc-settings-btn-div').css('background-color', 'rgb(39, 38, 38)');
			$('#account-dropdown-div').css('height', '500px');
			$('#account-dropdown-div').css('width', '300px');
			$('#account-dropdown-div').css('display', 'flex');
			$('#acc-settings-btn-div').css('border-left', '1px #666 solid');
			$('#acc-settings-btn-div').css('border-right', '1px #666 solid');
			$('#acc-settings-btn-div').css('border-top', '1px #666 solid');
			$('#notification-dd-content-div').css('display', 'none');
			$('#profile-dd-content').css('display', 'flex');
		} else if ($('#notification-btn').css('background-color') == 'rgb(39, 38, 38)') {
			$('#acc-settings-btn-div').css('background-color', 'rgb(39, 38, 38)');
			$('#account-dropdown-div').css('width', '300px');
			$('#notification-btn').css('background-color', '#333');
			$('#notification-btn').css('border-left', '');
			$('#notification-btn').css('border-right', '');
			$('#notification-btn').css('border-top', '');
			$('#acc-settings-btn-div').css('border-left', '1px #666 solid');
			$('#acc-settings-btn-div').css('border-right', '1px #666 solid');
			$('#acc-settings-btn-div').css('border-top', '1px #666 solid');
			$('#notification-dd-content-div').css('display', 'none');
			$('#profile-dd-content').css('display', 'flex');
		} else {
			$('#acc-settings-btn-div').css('background-color', '#333');
			$('#account-dropdown-div').css('height', '0');
			$('#acc-settings-btn-div').css('border-left', '');
			$('#acc-settings-btn-div').css('border-right', '');
			$('#acc-settings-btn-div').css('border-top', '');
			$('#account-dropdown-div').css('display', 'none');
			$('#account-dropdown-div').css('width', '0');
		}
	});
	$('#notification-btn').click(() => {
		if ($('#account-dropdown-div').height() == '0') {
			$('#notification-btn').css('background-color', 'rgb(39, 38, 38)');
			$('#account-dropdown-div').css('height', '500px');
			$('#account-dropdown-div').css('width', '400px');
			$('#account-dropdown-div').css('display', 'flex');
			$('#notification-btn').css('border-left', '1px #666 solid');
			$('#notification-btn').css('border-right', '1px #666 solid');
			$('#notification-btn').css('border-top', '1px #666 solid');
			$('#profile-dd-content').css('display', 'none');
			$('#notification-dd-content-div').css('display', 'flex');
			$('#notifications-icon-number-div').css('display', 'none');
		} else if ($('#acc-settings-btn-div').css('background-color') == 'rgb(39, 38, 38)') {
			$('#notification-btn').css('background-color', 'rgb(39, 38, 38)');
			$('#acc-settings-btn-div').css('background-color', '#333');
			$('#account-dropdown-div').css('width', '400px');
			$('#acc-settings-btn-div').css('border-left', '');
			$('#acc-settings-btn-div').css('border-right', '');
			$('#acc-settings-btn-div').css('border-top', '');
			$('#notification-btn').css('border-left', '1px #666 solid');
			$('#notification-btn').css('border-right', '1px #666 solid');
			$('#notification-btn').css('border-top', '1px #666 solid');
			$('#profile-dd-content').css('display', 'none');
			$('#notification-dd-content-div').css('display', 'flex');
			$('#notifications-icon-number-div').css('display', 'none');
		} else {
			$('#notification-btn').css('background-color', '#333');
			$('#account-dropdown-div').css('height', '0');
			$('#notification-btn').css('border-left', '');
			$('#notification-btn').css('border-right', '');
			$('#notification-btn').css('border-top', '');
			$('#account-dropdown-div').css('display', 'none');
			$('#account-dropdown-div').css('width', '0');
		}
	});
	$(document).mouseup(function (e) {
		var elements = [$('#notification-btn'), $('#acc-settings-btn-div'), $('#account-dropdown-div')];
		if ($('#account-dropdown-div').height() !== '0') {
			if (!elements[0].is(e.target) && !elements[1].is(e.target) && !elements[2].is(e.target) &&
				elements[0].has(e.target).length === 0 && elements[1].has(e.target).length === 0 &&
				elements[2].has(e.target).length === 0) {
				$('#account-dropdown-div').css('height', '0');
				$('#notification-btn').css('background-color', '#333');
				$('#acc-settings-btn-div').css('background-color', '#333');
				$('#acc-settings-btn-div').css('border-left', '');
				$('#acc-settings-btn-div').css('border-right', '');
				$('#acc-settings-btn-div').css('border-top', '');
				$('#notification-btn').css('border-left', '');
				$('#notification-btn').css('border-right', '');
				$('#notification-btn').css('border-top', '');
				$('#account-dropdown-div').css('display', 'none');
				$('#account-dropdown-div').css('width', '0');
			}
		}
	});
});