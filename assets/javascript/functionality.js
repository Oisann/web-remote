var host = "oisann.github.io";
if ((host == window.location.host) && (window.location.protocol != "https:"))
    window.location.protocol = "https";

var snapper = new Snap({
	element: $('.panel'),
	disable: 'right'
});

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
		//Send socket with name and passcode
	}
});

setTimeout(function(){
	$('.splash').fadeOut();
	setTimeout(function(){
		$('.splash').remove();
	}, 1000);
}, 5000);