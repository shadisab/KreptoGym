$(document).ready( async function() {
    data;
    var data;
    data
    const response = await fetch("/clients/allCoachs", {
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
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
     
      response.json().then((data)=>{
       let coachsCount= data.length
       data.forEach(coach => {
        $('#coachs').append($("<option></option>")
        .attr("value", coach.name)
        .text(coach.name))
       });
      
       
      });
     
  });