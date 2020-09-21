$(document).ready(async () => {

	/* GET the Passed id URL Parameter Values */
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const id = urlParams.get('id');
	/************/
	/* Marking the day of today */
	var a = new Date();
	var days = new Array(7);
	days[0] = 'sun';
	days[1] = 'mon';
	days[2] = 'tue';
	days[3] = 'wed';
	days[4] = 'thu';
	days[5] = 'fri';
	days[6] = 'sat';
	$('#' + days[a.getDay()]).css('background', 'rgb(207, 185, 151)').css('color', 'black');

	const nutrition = ['protine', 'carbs', 'fats', 'notes', 'calories'];
	const daysExercise = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];


	/*GET Client nutrition data */
	const getClientNutrition = await fetch('/coachs/client/nutrition/' + id, {
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

	getClientNutrition.json().then((data) => {
		nutrition.forEach((elem) => {
			$('#' + elem).val(data[elem]);
		});
	});

	/*GET Client nutrition data */
	const getClienttrainingSchedule = await fetch('/coachs/client/trainingSchedule/' + id, {
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

	getClienttrainingSchedule.json().then((data) => {
		daysExercise.forEach((day) => {
			$('#' + day).val(data[day]);
		});
	});
	//calculate Client Calories
	$('#calculateCalories').click(async () => {
		$('#calories').val(($('#protine').val() * 4) + ($('#carbs').val() * 4) + ($('#fats').val() * 9));
	});

	// On Updating nutrition data
	$('#nutritionsBTN').click(async () => {
		const fats = $('#fats').val();
		const carbs = $('#carbs').val();
		const protine = $('#protine').val();
		const notes = $('#notes').val();
		const calories = $('#calories').val();

		await fetch('/coachs/client/nutrition/' + id, {
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
				fats,
				carbs,
				protine,
				notes,
				calories
			}) // body data type must match "Content-Type" header
		});

	});

	$('#trainingBTN').click(async () => {
		const sunday = $('#sunday').val();
		const monday = $('#monday').val();
		const tuesday = $('#tuesday').val();
		const wednesday = $('#wednesday').val();
		const thursday = $('#thursday').val();
		const friday = $('#friday').val();
		const saturday = $('#saturday').val();

		await fetch('/coachs/client/trainingSchedule/' + id, {
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
				sunday,
				monday,
				tuesday,
				wednesday,
				thursday,
				friday,
				saturday,
			}) // body data type must match "Content-Type" header
		});

	});

	$('#logout').mouseover((e) => {
		$(e.target).css('cursor', 'pointer');
	});
	$('#logout').click(async () => {
		const logout = await fetch('/coachs/logout', {
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

});