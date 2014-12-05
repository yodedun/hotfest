
function getCategorias() {
    
    
    $.each(categorias, function(index, categoria) {
        $('#categoriasSection').append('<a href="listeventos.html?categoriaid=' + categoria.CatId + '" data-ajax="false"><div class="categoriaL categoriaID'+ categoria.CatId +'"><div class="imagenLista"><img src="http://' + categoria.Imagen + '"> </div>'+
            '<div class="namenLista" style="border-top: 4px solid #'+ categoria.Color +'">'+ categoria.Nombre +'</div></div></a>');
              
    });
    $("#categoriasSection a").click(function(){
        $('.divload').show();
        Lungo.Router.section("listEvents");
        $('.divload').fadeOut();
    });

    $('#divload').fadeOut(); 
};


