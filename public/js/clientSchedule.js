$(document).ready(async () => {

    const nutrition = ['protine', 'carbs', 'fats', 'notes', 'calories']
    const daysExercise = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

    var a = new Date();
    var days = new Array(7);
    days[0] = "sun";
    days[1] = "mon";
    days[2] = "tue";
    days[3] = "wed";
    days[4] = "thu";
    days[5] = "fri";
    days[6] = "sat";
    $('#' + days[a.getDay()]).css("background", "#515151").css("color", "white")


    // GET client nutrtion data
    const getNutritionedata = await fetch("/clients/nutrition", {
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
    })
    // Load Client nutrition
    getNutritionedata.json().then((data) => {
        nutrition.forEach((elem) => {
            $("#" + elem).text(data[elem])
        })
    })

    // get client training data
    const getScheduledata = await fetch("/clients/training", {
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
    })
    // Load client trainig schedule
    getScheduledata.json().then((data) => {
        console.log(data);
        daysExercise.forEach((day) => {
            $("#" + day).text(data[day])
        })})
})