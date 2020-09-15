$(document).ready(async () => {

    $("#email").keypress(function () {
        $('#emailREQ').css('opacity', 0)
    });

    $("#password").keypress(function () {
        $('#passwordREQ').css('opacity', 0)
    });

    $('#loginBTN').click(async () => {
      
        const email = $('#email').val()
        if (email === '') {$('#emailREQ').text('Please Enter your Email').css('opacity', 1)}

        const password = $('#password').val()
        if (password === '') {$('#passwordREQ').text('Please Enter your Password').css('opacity', 1)}

        const postClient = await fetch("/clients/login", {
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
            body: JSON.stringify({
                email,
                password
            }) // body data type must match "Content-Type" header
        });

        if(postClient.status === 400 && password !== '' && email !== '' ){
            {$('#emailREQ').text('Please Enter a valid Email address and Password').css('opacity', 1)}
        }

        if(postClient.status === 200){
                window.location.href = ("/clientSchedule")
          
        }
    })
});