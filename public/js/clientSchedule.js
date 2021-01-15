$(document).ready(async () => {
	$('#card1').mouseenter(async () => {
		$('#card1-title-icon-div').css('height', '100%');
		$('#card1-text').css('display', 'flex');
		$('#card1-text').css('opacity', '1');
	});
	$('#card1').mouseleave(async () => {
		$('#card1-title-icon-div').css('height', '25%');
		$('#card1-text').css('display', 'none');
		$('#card1-text').css('opacity', '0');
	});
	$('#card2').mouseenter(async () => {
		$('#card2-title-icon-div').css('height', '100%');
		$('#card2-text').css('display', 'flex');
		$('#card2-text').css('opacity', '1');
	});
	$('#card2').mouseleave(async () => {
		$('#card2-title-icon-div').css('height', '25%');
		$('#card2-text').css('display', 'none');
		$('#card2-text').css('opacity', '0');
	});

	$('#schedule-left-btn').click(async () => {
		var allDays = ['day-sunday','day-monday','day-tuesday','day-wedensday','day-thursday','day-friday','day-saturday'];
		for (let index = 0; index < allDays.length; index++) {
			if($('#' + allDays[index]).hasClass('display-flex')){
				if(index == 0){
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
		console.log(allDays[allDays.length - 1]);
	});
    
	$('#schedule-right-btn').click(async () => {
		var allDays = ['day-sunday','day-monday','day-tuesday','day-wedensday','day-thursday','day-friday','day-saturday'];
		for (let index = 0; index < allDays.length; index++) {
			if($('#' + allDays[index]).hasClass('display-flex')){
				console.log(index);
				if(index == 6){
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
});