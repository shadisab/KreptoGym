$('#client-help-btn').click(() => {
	window.location.href = ('/clientHelp');
});

$('#coach-help-btn').click(() => {
	window.location.href = ('/coachHelp');
});


$(document).ready(()=> {
	if($('#H-help-container-1').css('display') === 'flex'){
		$('#left-arrow-btn').css('display','none');
	}
	if($('#H-help-container-coach-1').css('display') === 'flex'){
		$('#left-arrow-btn2').css('display','none');
	}
    
	$('#left-arrow-btn').click(() => {
		if($('#H-help-container-2').css('display') === 'flex'){
			$('#H-help-container-2').css('display','none');
			$('#H-help-container-1').css('display','flex');
			$('#left-arrow-btn').css('display','none');
		} else if($('#H-help-container-3').css('display') === 'flex'){
			$('#H-help-container-3').css('display','none');
			$('#H-help-container-2').css('display','flex');
			$('#right-arrow-btn').css('display','flex');
		} 
	});
    
	$('#right-arrow-btn').click(() => {
		if($('#H-help-container-1').css('display') === 'flex'){
			$('#H-help-container-1').css('display','none');
			$('#H-help-container-2').css('display','flex');
			$('#left-arrow-btn').css('display','flex');
		} else if($('#H-help-container-2').css('display') === 'flex'){
			$('#H-help-container-2').css('display','none');
			$('#H-help-container-3').css('display','flex');
			$('#right-arrow-btn').css('display','none');
		} 
	});

	$('#left-arrow-btn2').click(() => {
		if($('#H-help-container-coach-2').css('display') === 'flex'){
			$('#H-help-container-coach-2').css('display','none');
			$('#H-help-container-coach-1').css('display','flex');
			$('#left-arrow-btn2').css('display','none');
		} else if($('#H-help-container-coach-3').css('display') === 'flex'){
			$('#H-help-container-coach-3').css('display','none');
			$('#H-help-container-coach-2').css('display','flex');
		}  else if($('#H-help-container-coach-4').css('display') === 'flex'){
			$('#H-help-container-coach-4').css('display','none');
			$('#H-help-container-coach-3').css('display','flex');
			$('#right-arrow-btn2').css('display','flex');
		}
	});
    
	$('#right-arrow-btn2').click(() => {
		if($('#H-help-container-coach-1').css('display') === 'flex'){
			$('#H-help-container-coach-1').css('display','none');
			$('#H-help-container-coach-2').css('display','flex');
			$('#left-arrow-btn2').css('display','flex');
		} else if($('#H-help-container-coach-2').css('display') === 'flex'){
			$('#H-help-container-coach-2').css('display','none');
			$('#H-help-container-coach-3').css('display','flex');          
		}  else if($('#H-help-container-coach-3').css('display') === 'flex'){
			$('#H-help-container-coach-3').css('display','none');
			$('#H-help-container-coach-4').css('display','flex');
			$('#right-arrow-btn2').css('display','none');
		}
	});
});
