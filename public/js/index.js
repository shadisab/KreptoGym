$(window).scroll(function () {
	var header = $(document).scrollTop();
	var headerHeight = $('.header').outerHeight();
	if (header > headerHeight) {
		$('.header').addClass('fixed');
	} else {
		$('.header').removeClass('fixed');
	}
});

$(window).scroll(function () {
	var header = $(document).scrollTop();
	var headerHeight = $('.header').outerHeight();
	if (header > headerHeight) {
		$('.header').addClass('fixed');
		$('.header').addClass('in-view');
		$('.HP-logo-icon').css('font-size', '60px');
		$('.logo-text-div').css('margin-top', '5px');
		$('.logo1').css('font-size', '20px');
		$('.logo1').css('line-height', '20px');
		$('.logo2').css('font-size', '10px');
		$('.logo2').css('line-height', '20px');
		$('.logo2').css('letter-spacing', '2.5em');
		$('.links-div').css('margin-left', '63px');
	} else {
		$('.header').removeClass('fixed');
		$('.header').removeClass('in-view');
		$('.HP-logo-icon').css('font-size', '80px');
		$('.logo-text-div').css('margin-top', '10px');
		$('.logo1').css('font-size', '30px');
		$('.logo1').css('line-height', '30px');
		$('.logo2').css('font-size', '20px');
		$('.logo2').css('line-height', '30px');
		$('.logo2').css('letter-spacing', '1.65em');
		$('.links-div').css('margin-left', '0');
	}
});

$('#home-btn').click(() => {
	$('html , body').animate({
		scrollTop: 0
	}, 'slow');
});

$('#about-btn').click(() => {
	$('html , body').animate({
		scrollTop: 742.5
	}, 'slow');
});

$('#help-btn').click(() => {
	$('html , body').animate({
		scrollTop: 1305
	}, 'slow');
});

$('#Contact-us-btn').click(() => {
	$('html , body').animate({
		scrollTop: 1868
	}, 'slow');
});

$('#btn1').on('click', () => {
	$('#brdr1').css('border-bottom','1px solid rgb(207, 185, 151)');
	$('#brdr2').css('border-bottom','1px solid rgb(207, 185, 151, .5)');
	$('#brdr3').css('border-bottom','1px solid rgb(207, 185, 151, .5)');
	$('#text-DIV-left').show().siblings('div').hide();
});

$('#btn2').on('click', () => {
	$('#brdr1').css('border-bottom','1px solid rgb(207, 185, 151, .5)');
	$('#brdr2').css('border-bottom','1px solid rgb(207, 185, 151)');
	$('#brdr3').css('border-bottom','1px solid rgb(207, 185, 151, .5)');
	$('#text-DIV-center').show().siblings('div').hide();
});

$('#btn3').on('click', () => {
	$('#brdr1').css('border-bottom','1px solid rgb(207, 185, 151, .5)');
	$('#brdr2').css('border-bottom','1px solid rgb(207, 185, 151, .5)');
	$('#brdr3').css('border-bottom','1px solid rgb(207, 185, 151)');
	$('#text-DIV-right').show().siblings('div').hide();
});