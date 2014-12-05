
function getCiudades() {
    
    
    $.each(ciudadesSelect, function(index, ciudadades) {
        $('#ciudadesSection ul').append('<li class="arrow"><a href="listeventos.html?ciudadId=' + ciudadades.CiudadId + '" data-ajax="false"><div class="categoriaL categoriaID'+ ciudadades.CiudadId +'">'+
            '<div class="namenLista">'+ ciudadades.Nombre +'</div></div></a></li>');
              
    });
    $("#ciudadesSection a").click(function(){
        $('.divload').show();
        Lungo.Router.section("listEvents");
        $('.divload').fadeOut();
    });

    $('#divload').fadeOut(); 
};

