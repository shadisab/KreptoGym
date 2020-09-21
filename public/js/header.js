$('#dropbtn2').click(() => {
	if ($('#myDropdown2').css('display') == 'flex') {
		$('#myDropdown2').css('display', 'none');
	} else {
		$('#myDropdown2').css('display', 'flex');
		$('#myDropdown').css('display', 'none');
	}

});
$('#dropbtn').click(() => {
	if ($('#myDropdown').css('display') == 'flex') {
		$('#myDropdown').css('display', 'none');
	}
	else {
		$('#myDropdown').css('display', 'flex');
		$('#myDropdown2').css('display', 'none');
	}
});
$(window).click(function (e) {
	if (!e.target.matches('#dropbtn') && !e.target.matches('#dropbtn2')
    && !e.target.matches('#coach-sign-up-btn') && !e.target.matches('#client-sign-up-btn')
    && !e.target.matches('#coach-log-in-btn') && !e.target.matches('#client-log-in-btn')) {
		$('#myDropdown').css('display', 'none');
		$('#myDropdown2').css('display', 'none');
	}
});
// window.onclick = function (event) {
//   if (!event.target.matches('#dropbtn')) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
//   if (!event.target.matches('#dropbtn2')) {
//     var dropdowns = document.getElementsByClassName("dropdown-content2");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }