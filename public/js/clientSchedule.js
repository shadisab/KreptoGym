/* eslint-disable no-undef */
$(document).ready(async () => {

	const socket = io();
	let clientID = '';

	$('#logout').on('click', async()=> {
		const logout = await fetch('/clients/logout', {
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
			// body data type must match "Content-Type" header
		});
		if (logout.status === 200) {
			logout.json().then(() => {
				window.location.href = ('/');
			});
		}
	});

	const clientProfile = await fetch('/clients/myProfile',{
		method: 'GET', 
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	});
	if(clientProfile.status === 200){
		clientProfile.json().then((data)=>{
			clientID = data._id;
			socket.emit('joinScheduale', clientID);
		});	
		
	}
	socket.on('refresh', () => {
		alert('Your coach made some changes please refresh your page');
	});

	const clienttrainingSchedule = await fetch('/clients/training', {
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
	if (clienttrainingSchedule.status === 200) {
		clienttrainingSchedule.json().then((data) => {
			Object.keys(data).forEach(key => {
				if(data[key].Muscle.length === 0 && data[key].Cardio.length === 0 && data[key].Stretches.length === 0){
					$(`#${key}-exercises-div`).append('<div class="clientSchedule-empty-exercises-msg">Rest day.</div>');
				}
				if (data[key].Muscle.length !== 0) {
					data[key].Muscle.forEach(element => {
						$(`#${key}-exercises-div`).append(addExerciseHTML(element));
					});
				}
				if (data[key].Cardio.length !== 0) {
					data[key].Cardio.forEach(element => {
						$(`#${key}-exercises-div`).append(addCardioHTML(element));
					});
				}
				if (data[key].Stretches.length !== 0) {
					data[key].Stretches.forEach(element => {
						$(`#${key}-exercises-div`).append(addStretchesHTML(element));
					});
				}
			});
		});
	}

	$('#card1').on('mouseenter', async () => {
		$('#card1-title-icon-div').css('height', '100%');
		$('#card1-text').css('display', 'flex');
		$('#card1-text').css('opacity', '1');
	});
	$('#card1').on('mouseleave', async () => {
		$('#card1-title-icon-div').css('height', '25%');
		$('#card1-text').css('display', 'none');
		$('#card1-text').css('opacity', '0');
	});
	$('#card2').on('mouseenter', async () => {
		$('#card2-title-icon-div').css('height', '100%');
		$('#card2-text').css('display', 'flex');
		$('#card2-text').css('opacity', '1');
	});
	$('#card2').on('mouseleave', async () => {
		$('#card2-title-icon-div').css('height', '25%');
		$('#card2-text').css('display', 'none');
		$('#card2-text').css('opacity', '0');
	});

	$('#schedule-left-btn').on('click', async () => {
		var allDays = ['day-sunday', 'day-monday', 'day-tuesday', 'day-wedensday', 'day-thursday', 'day-friday', 'day-saturday'];
		for (let index = 0; index < allDays.length; index++) {
			if ($('#' + allDays[index]).hasClass('display-flex')) {
				if (index == 0) {
					$('#' + allDays[index]).removeClass('display-flex');
					$('#' + allDays[allDays.length - 1]).addClass('display-flex');
					break;
				} else {
					$('#' + allDays[index]).removeClass('display-flex');
					$('#' + allDays[index - 1]).addClass('display-flex');
					break;
				}
			}
		}
	});

	$('#schedule-right-btn').on('click', async () => {
		var allDays = ['day-sunday', 'day-monday', 'day-tuesday', 'day-wedensday', 'day-thursday', 'day-friday', 'day-saturday'];
		for (let index = 0; index < allDays.length; index++) {
			if ($('#' + allDays[index]).hasClass('display-flex')) {
				if (index == 6) {
					$('#' + allDays[index]).removeClass('display-flex');
					$('#' + allDays[0]).addClass('display-flex');
					break;
				} else {
					$('#' + allDays[index]).removeClass('display-flex');
					$('#' + allDays[index + 1]).addClass('display-flex');
					break;
				}
			}
		}
	});

	const addExerciseHTML = (element) => {
		var html = `<div id="${element._id}" class="CSU-exercise">
		<div class="CSU-exercise-img-div">
			<img class="CSU-exercise-img" src="/images/weight.png" />
		</div>
		<div class="CSU-exercise-info">
			<div class="CSU-exercise-info-row-div">
				<div class="CSU-exercise-info-piece-div">
					<div class="CSU-exercise-info-piece-title">Exercise:</div>
					<div class="CSU-exercise-info-piece">${element.Exercise_name}</div>
				</div>
				<div class="CSU-exercise-info-piece-div" style="left: 40%;">
					<div class="CSU-exercise-info-piece-title">Sets:</div>
					<div class="CSU-exercise-info-piece">${element.Number_of_reps}</div>
				</div>
				<div class="CSU-exercise-info-piece-div" style="right: 10px;">
					<div class="CSU-exercise-info-piece-title">Recommended weight:</div>
					<div class="CSU-exercise-info-piece">${element.Recommended_weight}</div>
					<div class="CSU-exercise-info-piece">Kg</div>
				</div>
			</div>
			<div class="CSU-exercise-info-row-div">
				<div class="CSU-exercise-info-piece-title">Description:</div>
				<div class="CSU-exercise-info-piece">${element.Description}</div>
			</div>
		</div>
	</div>`;
		return html;
	};
	const addCardioHTML = (element) => {
		var html = `<div id="${element._id}" class="CSU-exercise">
		<div class="CSU-exercise-img-div">
			<img class="CSU-exercise-img" src="/images/treadmill.png" />
		</div>
		<div class="CSU-exercise-info">
			<div class="CSU-exercise-info-row-div">
				<div class="CSU-exercise-info-piece-div">
					<div class="CSU-exercise-info-piece-title">Exercise:</div>
					<div class="CSU-exercise-info-piece">${element.Exercise_name}</div>
				</div>
				<div class="CSU-exercise-info-piece-div" style="left: 40%;">
					<div class="CSU-exercise-info-piece-title">Exercise time:</div>
					<div class="CSU-exercise-info-piece">${element.Exercise_time_in_minutes}</div>
					<div class="CSU-exercise-info-piece" style="margin-left: 5px;">Minutes</div>
				</div>
			</div>
			<div class="CSU-exercise-info-row-div">
				<div class="CSU-exercise-info-piece-title">Description:</div>
				<div class="CSU-exercise-info-piece">${element.Description}</div>
			</div>
		</div>
	</div>`;
		return html;
	};

	const addStretchesHTML = (element) => {
		var html = `<div id="${element._id}" class="CSU-exercise">
		<div class="CSU-exercise-img-div">
			<i class="CSU-exercise-img-icon fas fa-walking"></i>
		</div>
		<div class="CSU-exercise-info">
			<div class="CSU-exercise-info-row-div">
				<div class="CSU-exercise-info-piece-div">
					<div class="CSU-exercise-info-piece-title">Exercise:</div>
					<div class="CSU-exercise-info-piece">${element.Exercise_name}</div>
				</div>
			</div>
			<div class="CSU-exercise-info-row-div">
				<div class="CSU-exercise-info-piece-title">Description:</div>
				<div class="CSU-exercise-info-piece">${element.Description}</div>
			</div>
		</div>
	</div>`;
		return html;
	};

});