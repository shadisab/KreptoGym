$(document).ready(async () => {

    const getCoachs = await fetch("/clients/allCoachs", {
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

    getCoachs.json().then((data) => {
        let coachsCount = data.length
        data.forEach(coach => {
            $('#coachs').append($("<option></option>")
                .attr("value", coach._id)
                .text(coach.name))
        });
    });
    
    $("#name").keypress(function () {
        $('#ERRname').css('opacity', 0)
    });

    $("#email").keypress(function () {
        $('#emailREQ').css('opacity', 0)
    });

    $("#password").keypress(function () {
        $('#passwordREQ').css('opacity', 0)
    });

    $("#confirmPassword").keypress(function () {
        $('#ERRmatchPASS').css('opacity', 0)
    });

    $("#age").keypress(function () {
        $('#ageREQ').css('opacity', 0)
    });

    $("#height").keypress(function () {
        $('#heightREQ').css('opacity', 0)
    });

    $("#weight").keypress(function () {
        $('#weightREQ').css('opacity', 0)
    });

    $("#coachs").keypress(function () {
        $('#coachREQ').css('opacity', 0)
    });



    $('#clientREG').click(async () => {
        const name = $('#name').val()
        if (name === '') { $('#nameREQ').css('opacity', 1) }

        const email = $('#email').val()
        if (email === '') {$('#emailREQ').css('opacity', 1)}

        const password = $('#password').val()
        if (password === '') {$('#passwordREQ').css('opacity', 1)}

        const confirmPassword = $('#confirmPassword').val()
        if (password !== '' && confirmPassword !== password ) { $('#ERRmatchPASS').css('opacity', 1) }

        const age = $('#age').val()
        if (age ==='') { $('#ageREQ').css('opacity', 1)}

        const height = $('#height').val()
        if (height === '') {  $('#heightREQ').css('opacity', 1) }

        const weight = $('#weight').val()
        if (weight === '') {$('#weightREQ').css('opacity', 1)}

        const coachID = $('#coachID').val()
        if (coachID === '') {  $('#coachREQ').css('opacity', 1)}

        const postClient = await fetch("/clients/signup", {
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
                name,
                email,
                password,
                age,
                userType: "client",
                weight,
                height
            }) // body data type must match "Content-Type" header
        });
        if(postClient.status === 201){
            window.location.replace("/clientHome")
        }
    })

});