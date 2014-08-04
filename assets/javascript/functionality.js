var host = "oisann.github.io";
if ((host == window.location.host) && (window.location.protocol != "https:"))
    window.location.protocol = "https";

$(window).bind('orientationchange', function(e, onready){
   if(onready){
       $(document.body).addClass('portrait-onready');
   }
   if (Math.abs(window.orientation) != 90){
       $(document.body).addClass('portrait');
   } 
   else {
       $(document.body).removeClass('portrait').removeClass('portrait-onready');
   }
});
$(window).trigger('orientationchange', true); // fire the orientation change event at the start, to make sure 