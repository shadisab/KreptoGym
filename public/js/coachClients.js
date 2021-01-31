$(document).ready(async () => {
	var MyClients = await fetch('/coaches/myClients', {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	});
	MyClients.json().then((data) => {
		$('#back').hide();
		let profilePic = '';
		console.log(data);
		data.forEach((client) => {
			if(client.profilePic != undefined)
				profilePic = `data:image/png;base64,${client.profilePic}`;
			else 
				profilePic = '/images/default-pp.png';
			$('.CC-clients-DIV').append(
				`<div class="CC-client-card" id="${client._id}">
                <div class="CC-client-card-inner" id="${client._id}">
                    <div class="CC-client-card-front" id="${client._id}">
                        <div class="CC-client-name-div" id="${client._id}">
                            <div class="CC-client-name">${client.name}</div >
                        </div>
                        <img src="${profilePic}" class="CC-client-card-photo" id="${client._id}">
                    </div>
                    <div name="CC-client-card-back" class="CC-client-card-back" id="${client._id}">
                        <div class="CC-client-card-back-info-text" id="${client._id}">Go to client schedule</div>
                    </div>
                </div >
            </div >`
			);
		});
	});

	$('.CC-clients-DIV').click((e) => {
		if (e.target.id !== '') {
			window.location.href = (`/coachScheduleUpdate?id=${e.target.id}`);
		}
	});

	

	$('#next').on('click', async () => {
		$('#back').show();
		let num = parseInt($('#paginationNumber').text()) + 1;
		MyClients = await fetch(`/coaches/myClients?skip=${(num - 1) * 6}`, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		}).then((data) => {
			if (data.status === 200) {
				data.json().then((data) => {
					if (data.length < 6) {
						$('#next').hide();
					}
					else {
						$('#next').show();
					}
					$('.CC-clients-DIV').empty();
					data.forEach((client) => {
						$('.CC-clients-DIV').append(
							`<div class="CC-client-card" id="${client._id}">
							<div class="CC-client-card-inner" id="${client._id}">
								<div class="CC-client-card-front" id="${client._id}">
									<div class="CC-client-name-div" id="${client._id}">
										<div class="CC-client-name">${client.name}</div >
									</div>
									<img src="data:image/png;base64,${client.profilePic}" class="CC-client-card-photo" id="${client._id}">
								</div>
								<div name="CC-client-card-back" class="CC-client-card-back" id="${client._id}">
									<div class="CC-client-card-back-info-text" id="${client._id}">Go to client schedule</div>
								</div>
							</div >
						</div >`
						);
					});
					$('#paginationNumber').text(num);
				});
			}
		});
	});

	$('#back').on('click', async () => {
		$('#next').show();
		if (parseInt($('#paginationNumber').text()) > 1) {
			let num = parseInt($('#paginationNumber').text()) - 1;
			await fetch(`/coaches/myClients?skip=${(num - 1) * 6}`, {
				method: 'GET', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				redirect: 'follow', // manual, *follow, error
				referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			}).then((data) => {
				if (data.status === 200) {
					data.json().then((data) => {
						$('.CC-clients-DIV').empty();
						data.forEach((client) => {
							$('.CC-clients-DIV').append(
								`<div class="CC-client-card" id="${client._id}">
								<div class="CC-client-card-inner" id="${client._id}">
									<div class="CC-client-card-front" id="${client._id}">
										<div class="CC-client-name-div" id="${client._id}">
											<div class="CC-client-name">${client.name}</div >
										</div>
										<img src="data:image/png;base64,${client.profilePic}" class="CC-client-card-photo" id="${client._id}">
									</div>
									<div name="CC-client-card-back" class="CC-client-card-back" id="${client._id}">
										<div class="CC-client-card-back-info-text" id="${client._id}">Go to client schedule</div>
									</div>
								</div >
							</div >`
							);
						});
						$('#paginationNumber').text(num);
						if (num === 1) {
							$('#back').hide();
						}
					});
				}
			});
		}
	});
});