$(document).ready(async () => {
	$('#sunday-open-icon').click(async () => {
		if ($('#sunday-open-icon').hasClass('fa-caret-down')) {
			$('#sunday-exercises-div').css('height', '300px');
			$('#sunday-exercises-div').css('opacity', '1');
			$('#sunday-open-icon').removeClass('fa-caret-down');
			$('#sunday-open-icon').addClass('fa-caret-up');
			$('#sunday-add-exercise-btn').addClass('fa-plus');
			$('#sunday-add-exercise-btn').css('display', 'flex');
		} else {
			$('#sunday-exercises-div').css('height', '0');
			$('#sunday-exercises-div').css('opacity', '0');
			$('#sunday-open-icon').removeClass('fa-caret-up');
			$('#sunday-open-icon').addClass('fa-caret-down');
			$('#sunday-add-exercise-btn').css('display', 'none');
			$('#sunday-add-exercise-btn').removeClass('fa-plus');
		}
	});
	$('#monday-open-icon').click(async () => {
		if ($('#monday-open-icon').hasClass('fa-caret-down')) {
			$('#monday-exercises-div').css('height', '300px');
			$('#monday-open-icon').removeClass('fa-caret-down');
			$('#monday-open-icon').addClass('fa-caret-up');
			$('#monday-add-exercise-btn').addClass('fa-plus');
			$('#monday-add-exercise-btn').css('display', 'flex');
		} else {
			$('#monday-exercises-div').css('height', '0');
			$('#monday-open-icon').removeClass('fa-caret-up');
			$('#monday-open-icon').addClass('fa-caret-down');
			$('#monday-add-exercise-btn').css('display', 'none');
			$('#monday-add-exercise-btn').removeClass('fa-plus');
		}
	});
	$('#tuesday-open-icon').click(async () => {
		if ($('#tuesday-open-icon').hasClass('fa-caret-down')) {
			$('#tuesday-exercises-div').css('height', '300px');
			$('#tuesday-open-icon').removeClass('fa-caret-down');
			$('#tuesday-open-icon').addClass('fa-caret-up');
			$('#tuesday-add-exercise-btn').addClass('fa-plus');
			$('#tuesday-add-exercise-btn').css('display', 'flex');
		} else {
			$('#tuesday-exercises-div').css('height', '0');
			$('#tuesday-open-icon').removeClass('fa-caret-up');
			$('#tuesday-open-icon').addClass('fa-caret-down');
			$('#tuesday-add-exercise-btn').css('display', 'none');
			$('#tuesday-add-exercise-btn').removeClass('fa-plus');
		}
	});
	$('#wednesday-open-icon').click(async () => {
		if ($('#wednesday-open-icon').hasClass('fa-caret-down')) {
			$('#wednesday-exercises-div').css('height', '300px');
			$('#wednesday-open-icon').removeClass('fa-caret-down');
			$('#wednesday-open-icon').addClass('fa-caret-up');
			$('#wednesday-add-exercise-btn').addClass('fa-plus');
			$('#wednesday-add-exercise-btn').css('display', 'flex');
		} else {
			$('#wednesday-exercises-div').css('height', '0');
			$('#wednesday-open-icon').removeClass('fa-caret-up');
			$('#wednesday-open-icon').addClass('fa-caret-down');
			$('#wednesday-add-exercise-btn').css('display', 'none');
			$('#wednesday-add-exercise-btn').removeClass('fa-plus');
		}
	});
	$('#thursday-open-icon').click(async () => {
		if ($('#thursday-open-icon').hasClass('fa-caret-down')) {
			$('#thursday-exercises-div').css('height', '300px');
			$('#thursday-open-icon').removeClass('fa-caret-down');
			$('#thursday-open-icon').addClass('fa-caret-up');
			$('#thursday-add-exercise-btn').addClass('fa-plus');
			$('#thursday-add-exercise-btn').css('display', 'flex');
		} else {
			$('#thursday-exercises-div').css('height', '0');
			$('#thursday-open-icon').removeClass('fa-caret-up');
			$('#thursday-open-icon').addClass('fa-caret-down');
			$('#thursday-add-exercise-btn').css('display', 'none');
			$('#thursday-add-exercise-btn').removeClass('fa-plus');
		}
	});
	$('#friday-open-icon').click(async () => {
		if ($('#friday-open-icon').hasClass('fa-caret-down')) {
			$('#friday-exercises-div').css('height', '300px');
			$('#friday-open-icon').removeClass('fa-caret-down');
			$('#friday-open-icon').addClass('fa-caret-up');
			$('#friday-add-exercise-btn').addClass('fa-plus');
			$('#friday-add-exercise-btn').css('display', 'flex');
		} else {
			$('#friday-exercises-div').css('height', '0');
			$('#friday-open-icon').removeClass('fa-caret-up');
			$('#friday-open-icon').addClass('fa-caret-down');
			$('#friday-add-exercise-btn').css('display', 'none');
			$('#friday-add-exercise-btn').removeClass('fa-plus');
		}
	});
	$('#saturday-open-icon').click(async () => {
		if ($('#saturday-open-icon').hasClass('fa-caret-down')) {
			$('#saturday-exercises-div').css('height', '300px');
			$('#saturday-open-icon').removeClass('fa-caret-down');
			$('#saturday-open-icon').addClass('fa-caret-up');
			$('#saturday-add-exercise-btn').addClass('fa-plus');
			$('#saturday-add-exercise-btn').css('display', 'flex');
		} else {
			$('#saturday-exercises-div').css('height', '0');
			$('#saturday-open-icon').removeClass('fa-caret-up');
			$('#saturday-open-icon').addClass('fa-caret-down');
			$('#saturday-add-exercise-btn').css('display', 'none');
			$('#saturday-add-exercise-btn').removeClass('fa-plus');
		}
	});

	$('#sunday-add-exercise-btn').on('click', function (event) {
		event.preventDefault();
		$('#add-exercise-popup').addClass('is-visible');
	});

	$('#add-exercise-popup-close').on('click', function (event) {
		event.preventDefault();
		$('#add-exercise-popup').removeClass('is-visible');
	});

	$('#muscle-building-choice-btn').on('click', function () {
		if ($('#cardio-exercise-div').css('display') == 'flex') {
			$('#cardio-exercise-div-inner').css('width', '50%');
			$('#cardio-exercise-div-inner').css('opacity', '0');
			$('.CSU-add-exercise-buttons-border').css('left','0');
			setTimeout(() => {
				$('#cardio-exercise-div').css('display', 'none');
				$('#muscle-building-exercise-div').css('display', 'flex');
			}, 200);
			setTimeout(() => {
				$('#muscle-building-exercise-div-inner').css('width', '80%');
				$('#muscle-building-exercise-div-inner').css('opacity', '1');
			}, 250);
		} else if ($('#other-exercises-div').css('display') == 'flex') {
			$('#other-exercises-div-inner').css('width', '50%');
			$('#other-exercises-div-inner').css('opacity', '0');
			$('.CSU-add-exercise-buttons-border').css('left','0');
			setTimeout(() => {
				$('#other-exercises-div').css('display', 'none');
				$('#muscle-building-exercise-div').css('display', 'flex');
			}, 200);
			setTimeout(() => {
				$('#muscle-building-exercise-div-inner').css('width', '80%');
				$('#muscle-building-exercise-div-inner').css('opacity', '1');
			}, 250);
		}
	});

	$('#cardio-choice-btn').on('click', function () {
		if ($('#muscle-building-exercise-div').css('display') == 'flex') {
			$('#muscle-building-exercise-div-inner').css('width', '50%');
			$('#muscle-building-exercise-div-inner').css('opacity', '0');
			$('.CSU-add-exercise-buttons-border').css('left','33.333%');
			setTimeout(() => {
				$('#muscle-building-exercise-div').css('display', 'none');
				$('#cardio-exercise-div').css('display', 'flex');
			}, 200);
			setTimeout(() => {
				$('#cardio-exercise-div-inner').css('width', '80%');
				$('#cardio-exercise-div-inner').css('opacity', '1');
			}, 250);
		} else if ($('#other-exercises-div').css('display') == 'flex') {
			$('#other-exercises-div-inner').css('width', '50%');
			$('#other-exercises-div-inner').css('opacity', '0');
			$('.CSU-add-exercise-buttons-border').css('left','33.333%');
			setTimeout(() => {
				$('#other-exercises-div').css('display', 'none');
				$('#cardio-exercise-div').css('display', 'flex');
			}, 200);
			setTimeout(() => {
				$('#cardio-exercise-div-inner').css('width', '80%');
				$('#cardio-exercise-div-inner').css('opacity', '1');
			}, 250);
		}
	});

	$('#other-choice-btn').on('click', function () {
		if ($('#muscle-building-exercise-div').css('display') == 'flex') {
			$('#muscle-building-exercise-div-inner').css('width', '50%');
			$('#muscle-building-exercise-div-inner').css('opacity', '0');
			$('.CSU-add-exercise-buttons-border').css('left','66.666%');
			setTimeout(() => {
				$('#muscle-building-exercise-div').css('display', 'none');
				$('#other-exercises-div').css('display', 'flex');
			}, 200);
			setTimeout(() => {
				$('#other-exercises-div-inner').css('width', '80%');
				$('#other-exercises-div-inner').css('opacity', '1');
			}, 250);
		} else if ($('#cardio-exercise-div').css('display') == 'flex') {
			$('#cardio-exercise-div-inner').css('width', '50%');
			$('#cardio-exercise-div-inner').css('opacity', '0');
			$('.CSU-add-exercise-buttons-border').css('left','66.666%');
			setTimeout(() => {
				$('#cardio-exercise-div').css('display', 'none');
				$('#other-exercises-div').css('display', 'flex');
			}, 200);
			setTimeout(() => {
				$('#other-exercises-div-inner').css('width', '80%');
				$('#other-exercises-div-inner').css('opacity', '1');
			}, 250);
		}
	});

	$('#add-exercise-popup-btn').click(() => {
		if($('#muscle-building-exercise-div').css('display') == 'flex'){
			event.preventDefault();
			$('#add-exercise-popup').removeClass('is-visible');
		} else if ($('#cardio-exercise-div').css('display') == 'flex'){
			event.preventDefault();
			$('#add-exercise-popup').removeClass('is-visible');
		} else {
			event.preventDefault();
			$('#add-exercise-popup').removeClass('is-visible');
		}
	});
});