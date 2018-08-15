$(document).ready(function(){

	function SetCircle() {
		$window = $(window);
		width = $window.width();
    	height =$window.height();
    	diameter = Math.min(width, height);
    	topmargin = Math.max((height-diameter)/2,0);
    	$('.circlelink').css('height', diameter);
    	$('.circlelink').css('width', diameter);
    	$('.circlelink').css('margin-top', topmargin);
    	$('.circlelink img').css('height', diameter);
    	$('.circlelink img').css('width', diameter);
    	x0 = width/2;
		y0 = height/2;
	}
	
	SetCircle();
	
	$(window).resize(SetCircle);
	
	function R(obj, event) {
		x = event.pageX-x0;
		y = -event.pageY+y0;
		rsq = Math.pow(x, 2) + Math.pow(y, 2);
		r = Math.pow(rsq, .5);
		return r;
	}
	function Theta(obj, event) {
		x = event.pageX-x0;
		y = -event.pageY+y0;
		return Math.atan2(y,x);
	}
	
		$('.maindiv').mousemove(function(event){
		x = event.pageX-x0;
		y = -event.pageY+y0;
		r = Math.round(R(this, event));
		theta = Theta(this, event);
		n = (Math.floor((3.0/(2.0*Math.PI)) * (theta+(Math.PI/6))) + 3) % 3;
		if(r<diameter/2){
			switch(n){
					case 0:
						$('#imgdefault').css('display','none');
						$('#img0').css('display','block');
						$('#img1').css('display','none');
						$('#img2').css('display','none');
						break;
					case 1:
						$('#imgdefault').css('display','none');
						$('#img0').css('display','none');
						$('#img1').css('display','block');
						$('#img2').css('display','none');
						break;
					case 2:
						$('#imgdefault').css('display','none');
						$('#img0').css('display','none');
						$('#img1').css('display','none');
						$('#img2').css('display','block');
						break;
					}
				 }
			else {
  					$('#img0').css('display','none');
					$('#img1').css('display','none');
					$('#img2').css('display','none');
					$('#imgdefault').css('display','block');
  				}
			
		//$('#log2').text('x:'+ x + ' y:' + y + ' r:' + r + ' theta:' + theta + "   n: " + n);
	}); 
	
	$('.circlelink').click(function(event){
		//$('.circlelink img').css('display','none');
		r = Math.round(R(this, event));
		if(r <=diameter/2){
			theta = Theta(this, event);
			n = (Math.floor((3.0/(2.0*Math.PI)) * (theta+(Math.PI/6))) + 3) % 3;
			//$("#log").text("  x:  " + x + "   y:  " + y +"   r: " + r + "   n: " + n);
			
			switch(n){
				case 0:
					siteaddress = 'www.balancecommunity.com/pro-team/benplotkinswing';
					break;
				case 1:
					siteaddress = 'http://www.theoatmeal.com';
					break;
				case 2:
					siteaddress = 'http://www.phys.washington.edu/users/deepg/staff/benPS.shtml';
					break;
			}
			//window.location.assign(siteaddress);
		}
	});
	

});
