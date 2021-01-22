$('#profile-img').click(async () => {
	$('#img-upload').click();
});

$('#edit-text').click(async () => {
	$('#img-upload').click();
});
// let temp = false;
$('#img-upload').change(function () {
	$('#profile-img').attr('src', window.URL.createObjectURL(this.files[0]));
});