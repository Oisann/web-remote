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

setTimeout(function(){
	$('.splash').fadeOut();
	setTimeout(function(){
		$('.splash').remove();
	}, 1000);
}, 5000);