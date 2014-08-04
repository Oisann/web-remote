var host = "oisann.github.io",
	socket = io.connect('http://185.3.135.178:32236/');
if ((host == window.location.host) && (window.location.protocol != "https:")) window.location.protocol = "https";

document.body.addEventListener('touchmove', function(event) {
	console.log(event.source);
	//if (event.source == document.body)
	event.preventDefault();
}, false);

window.onresize = function() {
	$(document.body).width(window.innerWidth).height(window.innerHeight);
}

$(function() {
	window.onresize();
});

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

$('#name').val(localStorage.getItem('devicename'));
if(navigator.userAgent.match(/(iPod|iPhone|iPad)/i)) {
	$('.login input[type="submit"]').addClass('ios');
}

$('.menu-button').click(function(){
	snapper.open('left');
});

socket.on('login', function(boolean){
	if(boolean) {
		$('.loading').fadeOut(1000);
		setTimeout(function(){
			$('.loading').remove();
		}, 1000);
	} else {
		$('#passcode').val('');
		$('#passcode').focus();
	}
});

$('#login').submit(function(e){
	e.preventDefault();
	var name = $('#name').val(),
		passcode = sha256_digest($('#passcode').val());
	if(name.length <= 1 || passcode.length <= 1){
		$('#name').val('Invalid name/passcode');
		$('#passcode').val('');
		setTimeout(function(){
			$('#name').val(localStorage.getItem('devicename'));
		}, 1000);
	} else {
		localStorage.setItem('devicename', name);
		var data = {
			name: name,
			passcode: passcode,
			guid: guid
		}
		socket.emit('login', data);
	}
});

setTimeout(function(){
	$('.splash').fadeOut(1000);
	setTimeout(function(){
		$('.splash').remove();
		if($('#name').val() !== ''){
			$('#name').attr('disabled', '');
			$('#passcode').focus();
		}
	}, 1000);
}, 4000);