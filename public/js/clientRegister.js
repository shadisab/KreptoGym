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
        data.forEach(coach => {
            $('#coachs').append($("<option></option>")
                .attr("value", coach._id)
                .text(coach.name))
        });
    });

    $("#name").keydown(function () {
        $('#nameREQ').css('opacity', 0)
    });

    $("#email").keydown(function () {
        $('#emailREQ').css('opacity', 0)
    });

    $("#password").keydown(function () {
        $('#passwordREQ').css('opacity', 0)
        $('#ERRmatchPASS').css('opacity', 0)
    });

    $("#confirmPassword").keydown(function () {
        $('#ERRmatchPASS').css('opacity', 0)
    });

    $("#age").keydown(function () {
        $('#ageREQ').css('opacity', 0)
    });

    $("#height").keydown(function () {
        $('#heightREQ').css('opacity', 0)
    });

    $("#weight").keydown(function () {
        $('#weightREQ').css('opacity', 0)
    });

    $("#coachs").keydown(function () {
        $('#coachREQ').css('opacity', 0)
    });



    $('#clientREG').click(async () => {
        const name = $('#name').val()
        const email = $('#email').val()
        const password = $('#password').val()
        const age = $('#age').val()
        const height = $('#height').val()
        const weight = $('#weight').val()
        const coachID = $('#coachID').val()

        const confirmPassword = $('#confirmPassword').val()
        if (password !== '' && confirmPassword !== password) {
            $('#ERRmatchPASS').css('opacity', 1)
            $("#confirmPassword").val("")
        }

        if (password === confirmPassword) { // START IF 
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
                    height,
                    coachID
                }) // body data type must match "Content-Type" header
            });
            if (postClient.status === 400) {
                postClient.json().then((body) => {
                    console.log(body);
                    /*     If the response message is Required           */
                    if (body.errors["name"]) {
                        if (body.errors["name"].kind === "required") { $('#nameREQ').css('opacity', 1) }
                    }
                    if (body.errors["email"]) {
                        if (body.errors["email"].kind === "required") { $('#emailREQ').css('opacity', 1) }
                        if (body.errors["email"].kind === "user defined") { $('#emailREQ').text('Please enter a valid Email address').css('opacity', 1) }
                    }
                    if (body.errors["height"]) {
                        if (body.errors["height"].kind === "required") { $('#heightREQ').css('opacity', 1) }
                        if (body.errors["height"].kind === "user defined") { $('#heightREQ').text('Height most be positive').css('opacity', 1) }
                    }
                    if (body.errors["password"]) {
                        if (body.errors["password"].kind === "required") { $('#passwordREQ').css('opacity', 1) }
                        if (body.errors["password"].kind === "minlength") { $('#passwordREQ').text('Passowrd length most be > 6').css('opacity', 1) }
                        if (body.errors["password"].kind === "user defined") { $('#passwordREQ').text('Password must not contain "password"').css('opacity', 1) }
                    }
                    if (body.errors["weight"]) {
                        if (body.errors["weight"].kind === "required") { $('#weightREQ').css('opacity', 1) }
                        if (body.errors["weight"].kind === "user defined") { $('#weightREQ').text('Weight most be positive').css('opacity', 1) }
                    }
                    if (body.errors["age"]) {
                        if (body.errors["age"].kind === "required") { $('#ageREQ').css('opacity', 1) }
                        if (body.errors["age"].kind === "user defined") { $('#ageREQ').text('Age most be positive').css('opacity', 1) }
                    }
                    if (body.errors["coachID"]) {
                        if (body.errors["coachID"].kind === "required") { $('#coachREQ').css('opacity', 1) }
                    }
                    /*     IF the response message is Must be positive        */
                })
            }
            if (postClient.status === 201) {
                window.location.href = ("/clientHome")
            }
        } // END IF PASSWORD === CONFIRMPASS
    })

});