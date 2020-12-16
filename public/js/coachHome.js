$(document).ready(async () => {
	var pageWidth = $('#page-body').width();
	console.log(pageWidth);
	var innerMainwidth = pageWidth - 250;
	console.log(innerMainwidth);
	var test = innerMainwidth.toString();
	console.log(test);
	$('#sidebar-open-close').click(() => {
		if ($('#Sidenav').width() == '0') {
			$('#Sidenav').css('width', '250px');
			$('#inner-main').css('width', test);
			$('#inner-main').css('margin-left', '250px');
		} else {
			$('#Sidenav').css('width', '0');
			$('#inner-main').css('width', pageWidth);
			$('#inner-main').css('margin-left', '0');
		}
	});

	$('#acc-settings-btn-div').click(() => {
		if ($('#Profile-drop-down').height() == '0') {
			$('#acc-settings-btn-div').css('background-color', 'rgb(39, 38, 38)');
			$('#Profile-drop-down').css('height', '500px');
		} else if ($('#notification-btn').css('background-color') == 'rgb(39, 38, 38)') {
			$('#acc-settings-btn-div').css('background-color', 'rgb(39, 38, 38)');
			$('#notification-btn').css('background-color', '#333');
		} else {
			$('#acc-settings-btn-div').css('background-color', '#333');
			$('#Profile-drop-down').css('height', '0');
		}
	});
	$('#notification-btn').click(() => {
		if ($('#Profile-drop-down').height() == '0') {
			$('#notification-btn').css('background-color', 'rgb(39, 38, 38)');
			$('#Profile-drop-down').css('height', '500px');
		} else if ($('#acc-settings-btn-div').css('background-color') == 'rgb(39, 38, 38)') {
			$('#notification-btn').css('background-color', 'rgb(39, 38, 38)');
			$('#acc-settings-btn-div').css('background-color', '#333');
		} else {
			$('#notification-btn').css('background-color', '#333');
			$('#Profile-drop-down').css('height', '0');
		}
	});
});