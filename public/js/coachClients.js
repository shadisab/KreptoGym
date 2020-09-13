$(document).ready( async () => {
    const getClients = await fetch("/coaches/myClients", {
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
    getClients.json().then((data) => {
        data.forEach(client => {
            $('#clientsList').append(' <div class="clientDIV"><div class="pic-DIV"><div class="pic"></div></div><div class="client-info-DIV"> <div class="client-info-row-DIV"> <div class="client-info-text">Name:</div><div class="client-info-data">'+client.name+'</div><div class="client-info-text">Age:</div> <div class="client-info-data">'+client.age+'</div></div><div class="client-info-row-DIV"> <div class="client-info-text">Weight:</div><div class="client-info-data">'+client.weight+' KG</div><div class="client-info-text">Height:</div><div class="client-info-data">'+ client.height +' cm</div> </div> </div><div class="coach-select-btn-DIV"><button value="'+ client.id +'" id="trainingBTN" class="coach-select-btn">Update Training Schedule</button></div> <div class="coach-select-btn-DIV"> <button value="'+ client.id +'" id="nutritionBTN" class="coach-select-btn border-radius-adder">Update Nutritions</button></div></div><div class="clientDIV-filler"></div>')
        });
        
    });
});