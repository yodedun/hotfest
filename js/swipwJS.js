		$(function() {      
	      //Enable swiping...
	      $("#calendario").swipe( {
	        //Generic swipe handler for all directions
	        swipe:function(event, direction, distance, duration, fingerCount) {
	            if(direction == 'left') {
			           		var $this = $('.prev');
			           		
							jQuery.J.ChangeMonth(nextMonth2);
							localStorage['datemes'] = actual;
							setTimeout( dates, 100);
							setTimeout( festivosF, 100);
							
							  
							return false;  
				} else if(direction == 'right') {
						var $thisn = $('.next');
						
						jQuery.J.ChangeMonth(prevMonth2);
						localStorage['datemes'] = actual;
						setTimeout( dates, 100);
						setTimeout( festivosF, 100);
						  
						return false;
						
					}
								
			},
	        //Default is 75px, set to 0 for demo so any distance triggers swipe
	         threshold:40
	      });
		});