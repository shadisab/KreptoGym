$('#btn1').on('click', () => {
    $('#brdr1').css('border-bottom','1px solid #515151')
    $('#brdr2').css('border-bottom','1px solid rgba(81, 81, 81, .5)')
    $('#brdr3').css('border-bottom','1px solid rgba(81, 81, 81, .5)')
    $('#text-DIV-left').show().siblings('div').hide();
})

$('#btn2').on('click', () => {
    $('#brdr1').css('border-bottom','1px solid rgba(81, 81, 81, .5)')
    $('#brdr2').css('border-bottom','1px solid #515151')
    $('#brdr3').css('border-bottom','1px solid rgba(81, 81, 81, .5)')
    $('#text-DIV-center').show().siblings('div').hide();
})

$('#btn3').on('click', () => {
    $('#brdr1').css('border-bottom','1px solid rgba(81, 81, 81, .5)')
    $('#brdr2').css('border-bottom','1px solid rgba(81, 81, 81, .5)')
    $('#brdr3').css('border-bottom','1px solid #515151')
    $('#text-DIV-right').show().siblings('div').hide();
})