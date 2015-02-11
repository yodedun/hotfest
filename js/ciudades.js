
function getCiudades() {

     $.getJSON('http://apps.sbiweb.com/HOTFEST/CiudadJsonServlet.json', function(data) {
        
        ciudades = data.ciudadesSelect;
        $.each(ciudades, function(index, ciudad) {
        $('#ciudadesSection ul').append('<li class="arrow"><a href="listeventos.html?ciudadId=' + ciudad.CiudadId + '" data-ajax="false"><div class="categoriaL categoriaID'+ ciudad.CiudadId +'">'+
            '<div class="namenLista">'+ ciudad.Nombre +'</div></div></a></li>');
              
    });
    $("#ciudadesSection a").click(function(){
        $('.divload').show();
        Lungo.Router.section("listEvents");
        $('.divload').fadeOut();
    });

    $('#divload').fadeOut(); 


        
    });
    
    
    
};

