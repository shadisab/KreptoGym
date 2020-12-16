$(document).ready(async () => {
	
	$('#file-upload-icon').click(async () => {
		$('#resume-upload').click();
	});
	$('#resume-upload').change(function () {
		$('#file-uploaded-name').text(this.files[0].name);
	});
});