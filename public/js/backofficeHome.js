$(document).ready(async () => {
    
	const CoachesList = await fetch('/usersList', {
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
	});
	var coaches = [];
	if (CoachesList.status === 200) {
		CoachesList.json().then((data) => {
			data.forEach(coach => {
				coaches.push(coach);
				var backgroundcolor = '';
				if(coach.status === 'Testing'){
					backgroundcolor = '#FF6666';
				}
				else if(coach.status === 'Accepted'){
					backgroundcolor = '#66FFB2';
				}
				$('#newClients').append(
					'<tr style="background-color:' + backgroundcolor + ' ;"><td>' + coach.name + '</td> <td>' + coach.email + '</td><td><button value="'+ coach._id +'">></button> </td></tr>'
				);
			});
		});
		$('#newClients').on('click', 'button', async (e) => {
			var clientID = $(e.target).attr('value');
			$('#searchInput').val('');
			window.location.href = ('/BOcoachView?id=' + clientID);
		});
	}
	
 
	$('#searchInput').keyup(() => {
		if($('#searchInput').val() === ''){
			$('#newClients').css('opacity', 1);
			$('#Not-fnd-msg').css('opacity', 0);
			$('#newClients').remove();
			$('#divTable').append( 
				'<table id="newClients" style="opacity: 1; margin: auto; width: 60%; padding: 10px;  "><tr><th>Name</th><th>Email</th><th>View coach details</th></tr></table>'
			);
			coaches.forEach(coach =>{
				var backgroundcolor = '';
				if(coach.status === 'Testing'){
					backgroundcolor = '#FF6666';
				}
				else if(coach.status === 'Accepted'){
					backgroundcolor = '#66FFB2';
				}
				$('#newClients').append(
					'<tr style="background-color:' + backgroundcolor + ' ;"><td>' + coach.name + '</td> <td>' + coach.email + '</td><td><button value="'+ coach._id +'">></button> </td></tr>'
				);
			});
		}
	
		if($('#searchInput').val() != ''){
			var searchVar = $('#searchInput').val();
			var results = [];
			coaches.forEach(coach => {
				if(coach.name.toLowerCase().includes(searchVar.toLowerCase())){
					results.push(coach);
				}
			});
			if(results.length > 0){
				$('#newClients').css('opacity', 1);
				$('#Not-fnd-msg').css('opacity', 0);
				$('#newClients').remove();
				$('#divTable').append( 
					'<table id="newClients" style="opacity: 1; margin: auto; width: 60%; padding: 10px;"><tr><th>Name</th><th>Email</th><th>View coach details</th></tr></table>'
				);
				results.forEach(coach =>{
					var backgroundcolor = '';
					if(coach.status === 'Testing'){
						backgroundcolor = '#FF6666';
					}
					else if(coach.status === 'Accepted'){
						backgroundcolor = '#66FFB2';
					}
					$('#newClients').append(
						'<tr style="background-color:' + backgroundcolor + ' ;"><td>' + coach.name + '</td> <td>' + coach.email + '</td><td><button value="'+ coach._id +'">></button> </td></tr>'
					);
				});
			} else {
				$('#newClients').css('opacity', 0);
				$('#Not-fnd-msg').css('opacity', 1);
			}
		}
		$('#newClients').on('click', 'button', async (e) => {
			var clientID = $(e.target).attr('value');
			$('#searchInput').val('');
			window.location.href = ('/BOcoachView?id=' + clientID);
		});
	});

	$('#logoutBTN').on('click', async () => {
		const adminLogout = await fetch('/admin/logout', {
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
		});

		if(adminLogout.status === 200){
			window.location.replace('/adminLogin');
		}
	});
	if (CoachesList.status === 400) {
		// { $('#emailREQ').text('Please Enter a valid Email address and Password').css('opacity', 1); }
	}
});