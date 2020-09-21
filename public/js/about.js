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