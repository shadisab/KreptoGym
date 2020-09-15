$(document).ready(async () => {

    /* GET the Passed id URL Parameter Values */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    /************/
    console.log(id)
    var a = new Date();
    var days = new Array(7);
    days[0] = "sun";
    days[1] = "mon";
    days[2] = "tue";
    days[3] = "wed";
    days[4] = "thu";
    days[5] = "fri";
    days[6] = "sat";
    $("#sun").css("color", "#ffffff")
})