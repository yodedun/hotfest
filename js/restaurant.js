var serviceURL = localStorage['serviceURL'];
var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var restaurant = getUrlVars()["restaurant"];
var employees;
var map;

$(window).load(function() {
	setTimeout(getEmployee, 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').hide();
	alert("Error accessing the server");
});

function getEmployee() {
		// cargador
	$('#busy').show();
		// archivo consulta
	$.getJSON(serviceURL + 'restaurant.php?restaurant='+restaurant, function(data) {
		// quitar cargador
		$('#busy').hide();
		// 
		$('#employeeList li').remove();
		// leer item de employees
		employees = data.item ;
		$.each(employees, function(index, employee) {
			$('#fullName').append('<li><a href="restaurant.html?restaurant=' + employee.id + '">' +
					
					'<p class="line1">' + employee.nombre + '</p>' +
					'<p class="line2">' + employee.direccion + '</p>' +
					
					'<span class="bubble">' + employee.numero + '</span></a></li>');
					
						var mapOptions = {
						zoom: 19,
						center: new google.maps.LatLng(employee.lat,employee.lon),
						mapTypeId: google.maps.MapTypeId.ROADMAP
					  };
					  map = new google.maps.Map(document.getElementById('map-canvas'),
						  mapOptions);
						  
						 var companyLogo = new google.maps.MarkerImage(employee.logo,
								new google.maps.Size(100,50),
								new google.maps.Point(0,0),
								new google.maps.Point(50,50)
							);
							var companyShadow = new google.maps.MarkerImage(employee.sombra_imagen,
								new google.maps.Size(130,50),
								new google.maps.Point(0,0),
								new google.maps.Point(65, 50)
							);
						var companyPos = new google.maps.LatLng(employee.lat,employee.lon);
						var companyMarker = new google.maps.Marker({
							position: companyPos,
							map: map,
							icon: companyLogo,
							shadow: companyShadow,
							title:employee.nombre,
							zIndex: 3
						});
							
							
		});
		
		        
          
  
		
		setTimeout(function(){
			scroll.refresh();
		});
	});
}


        




function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
