var host = "oisann.github.io";
if ((host == window.location.host) && (window.location.protocol != "https:")) window.location.protocol = "https";

var snapper = new Snap({
	element: $('.panel'),
	disable: 'right'
});

function createGuid(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
}

var guid = localStorage.getItem('guid');
if(!guid){
	localStorage.setItem('guid', createGuid());
	guid = localStorage.getItem('guid');
}

$('form #passcode').blur(function() {
    $(this).closest('form').submit();
});

$('#name').val(localStorage.getItem('devicename'));
if($('#name').val() !== ''){
	$('#name').attr('disabled', '');
	$('#passcode').focus();
}

$('.menu-button').click(function(){
	snapper.open('left');
});

$('#login').submit(function(e){
	e.preventDefault();
	var name = $('#name').val(),
		passcode = $('#passcode').val();
	if(name.length <= 1 || passcode.length <= 1){
		$('#name').val('Invalid name/passcode');
		$('#passcode').val('');
		setTimeout(function(){
			$('#name').val('');
		}, 1000);
	} else {
		localStorage.setItem('devicename', name);
		//Send socket with name and passcode
	}
});

setTimeout(function(){
	$('.splash').fadeOut(1000);
	setTimeout(function(){
		$('.splash').remove();
	}, 1000);
}, 4000);