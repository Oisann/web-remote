if (("oisann.github.io" == window.location.host) && (window.location.protocol != "https:")) window.location.protocol = "https";
var socket = io.connect('http://130.185.155.130:32236/'),
	guid = localStorage.getItem('guid'),
	loginToken = localStorage.getItem('loginToken'),
	contentScroll = new IScroll('#content', { mouseWheel: true });

if(!guid){
	guid = createGuid();
	localStorage.setItem('guid', guid);
}

$('body').on('touchmove', function (e) {
	e.preventDefault();
});

$(window).on('scroll', function (e) {
	e.preventDefault();
});

window.onresize = function() {
	$(document.body).width(window.innerWidth).height(window.innerHeight);
}

$(function() {
	window.onresize();
});

var snapper = new Snap({
	element: document.getElementById('panel'),
	disable: 'right'
});

function sendStatusUpdate() {
	if(!guid) return;
	var data = {
		guid: guid,
		loginToken: loginToken
	}
	socket.emit('status', data);
}

function logout() {
	localStorage.removeItem('loginToken');
	window.location.href = window.location.href;
}

function createGuid(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
}

$('#name').val(localStorage.getItem('devicename'));
if(navigator.userAgent.match(/(iPod|iPhone|iPad)/i)) {
	$('.login input[type="submit"]').addClass('ios');
}

$('.menu-button').click(function(){
	snapper.open('left');
});

socket.on('status', function(boolean){
	if(boolean) {
		if($('.loading').length !== 0 && $('.splash').length !== 0) $('.login').remove();
		if($('.loading').length !== 0 && $('.splash').length === 0) {
			$('.loading').fadeOut(100);
			setTimeout(function(){
				$('.loading').remove();
			}, 101);
		}
	} else {
		if($('.loading').length == 0) window.location.href = window.location.href;
	}
});

socket.on('login', function(key){
	if(key !== 'login failed') {
		localStorage.setItem('loginToken', key);
		loginToken = key;
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

sendStatusUpdate();
setInterval(function() {
	sendStatusUpdate();
}, 5000);

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