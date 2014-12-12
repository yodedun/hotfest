

$.jMonthCalendar.ChangeMonth(new Date()) ;


$('#deviceProperties').click(function() {
        var status = device.platform;
            alert(status);

});
$("#hoy").click(function() {
    $('#divload').show();
    $.jMonthCalendar.ChangeMonth(new Date());
    localStorage['datemes'] = actual;
    $('#divload').fadeOut();
    return false;

});

$("#ciudades").change(function(){
       cambioCiudad();
    });

$("#eventos").change(function(){
       cambioCategoria();
    });    


function especiales() {

    
    
};

function multievento() {

    $('.DateBox > div').each(function(){

        $(this).children().remove('.festivo');
        $(this).children().remove('.especial');
  
        if(
            ($(this).children()).length > 1 ){           
            $(this).addClass('multievento')
        }
 
    });

    
};

function calendarIni() {
    categoriasF();
    ciudadesF();
    multievento();
    ciudadcache();

   
    //$.jMonthCalendar.Initialize(options, events);
};

function categoriasF() {
    $("option.addcat").remove()
    $.each(categorias, function(index, categoria) {
        $('#eventos').append('<option class="addcat" value="'+ categoria.CatId +'">'+ categoria.Nombre +'</option>');
              
    });
};

function ciudadesF() {
    $("option.addCity").remove()
    $.each(ciudadesSelect, function(index, ciudad) {
        $('#ciudades').append('<option class="addCity" value="'+ ciudad.CiudadId +'">'+ ciudad.Nombre +'</option>');
              
    });
};

function mescache() {

    if(localStorage.getItem('datemes')== null){           
        $.jMonthCalendar.ChangeMonth(new Date())
    }
    else{ 
        $.jMonthCalendar.ChangeMonth(new Date(localStorage.getItem('datemes')) )
    };
   
};


function ciudadcache() {
    if(localStorage.getItem('nameciudad')== null ){ 
    
        $('#addtour5').show();  
        $('.escoge').show();        
        selectedValue = '0';
        $('.bCiudad').addClass("seleccion");
    }
    else{ 
        if(localStorage.getItem('nameciudad')=== '0' ){ 
            $('#addtour5').show();    
            $('.escoge').show();        
            selectedValue = '0';
            $('.bCiudad').addClass("seleccion");
             
        }
        else{ 
            $('.escoge').remove();
            
            selectedValue =localStorage.getItem('nameciudad');
            setTimeout(function(){
                $('#ciudades').val(selectedValue).change();}, 10);
            
            //$('#eventos').val(0).change();
            //setTimeout(categoriacache,10);
        };
    };
 
        
};

function categoriacache() {
    if(localStorage.getItem('namecategoria')== null ){   
             
        selectedValueE = '0';
        eventosCategoria = JSON.stringify(eventsCiudad);
        sessionStorage['eventosCategoria'] = eventosCategoria;
        setTimeout(multievento, 60);
            setTimeout(festivosF, 70);
         
    }

    else{ 
        if(localStorage.getItem('namecategoria')=== '0' ){   
            
            selectedValueE = '0';
            eventosCategoria = JSON.stringify(eventsCiudad);
            sessionStorage['eventosCategoria'] = eventosCategoria;
            setTimeout(multievento, 60);
            setTimeout(festivosF, 70);
            
    
        }
        else{ 
         
            selectedValueE =localStorage.getItem('namecategoria');
            setTimeout(function(){
                $('#eventos').val(selectedValueE).change();}, 45);
                multievento(); 
             
        };
    };
        
};

    

function cambioCiudad() {
     $('#divload').show();
        //$('.bCiudad').removeClass("seleccion");
       // $('.escoge').remove();
        selectedValue = $('#ciudades').find(":selected").val();
        console.log(selectedValue);
        //selectedValueE = 0; //reseteo categoria
        //localStorage.removeItem('namecategoria'); //borro categoria

        $.jMonthCalendar.ReplaceEventCollection([]);
                           
        
        localStorage.removeItem('nameciudad');
        localStorage['nameciudad'] = selectedValue;
        eventsCiudad = getObjects(events, 'CiudadId', selectedValue ); 
        
        $.jMonthCalendar.AddEvents(eventsCiudad);

             
        

            


        
        
        mescache();
        eventsCiudad = getObjects(events, 'CiudadId', selectedValue ); 
        eventosCiudad = JSON.stringify(eventsCiudad);
        sessionStorage['eventosCiudad'] = eventosCiudad;
        selectedValueE =localStorage.getItem('namecategoria');
         
        setTimeout(function(){
                //$('#eventos').val(0).change();
                categoriacache();
              
            }, 55);
        //$('#eventos').val(0);

        
    $('#divload').fadeOut();

        
        //setTimeout( dates, 100);      

}    


function cambioCategoria() {
     $('#divload').show();

        selectedValueE = $('#eventos').find(":selected").val();  
       
        if( selectedValueE == 0 ){  
             $.jMonthCalendar.ReplaceEventCollection([]);
            //localStorage.removeItem('nameevento');
            //localStorage.removeItem('namecategoria');
            
            //calendarIni()  
            //eventsCiudad = getObjects(events, 'CiudadId', selectedValue );    
            
            eventosCategoria = JSON.stringify(eventsCiudad);
            sessionStorage['eventosCategoria'] = eventosCategoria;
            localStorage['namecategoria'] = selectedValueE;
            $.jMonthCalendar.Initialize(options, eventsCiudad);
            multievento();
            setTimeout(festivosF, 70);

        }
        else{ 
             $.jMonthCalendar.ReplaceEventCollection([]);
            //selectedValueE = $(this).find(":selected").val();
            //localStorage.removeItem('namecategoria');
            $.jMonthCalendar.ReplaceEventCollection([]);
            eventsCiudad = getObjects(events, 'CiudadId', selectedValue );    
            localStorage['namecategoria'] = selectedValueE;
            eventsCategoria = getObjects(eventsCiudad, 'CategoriaId', selectedValueE );

            $.jMonthCalendar.Initialize(options, eventsCategoria);
             
            eventosCategoria = JSON.stringify(eventsCategoria)
            sessionStorage['eventosCategoria'] = eventosCategoria;
          
            mescache();
            multievento(); 
            setTimeout(festivosF, 70);

            //backCategoria();
            //setTimeout( dates, 100); 
        };
    $('#divload').fadeOut();

        
        //setTimeout( dates, 100);      

}    


function mescache() {

    if(localStorage.getItem('datemes')== null){           
        $.jMonthCalendar.ChangeMonth(new Date())
    }
    else{ 
        $.jMonthCalendar.ChangeMonth(new Date(localStorage.getItem('datemes')) )
    };
   
};

function eventodestacado() {
    eventsDestacados = getObjects(events, 'Destacado', 1 );
    $.each(eventsDestacados, function(index, destacados) {
        $('#caruselKol3 ').append('<div class="item">' +
        '<div class="eventdesc" style="background:' + destacados.Color +'" data-id="'+ destacados.EventoId+'"> '+ 
                '<a href="evento.html?id=' + destacados.EventoId + '" data-ajax="false" >' +
                   
                                '<div class="imgEvent">' +
                                    '<img src="http://' + destacados.Imagen + '">' +
                                '</div> ' +
                                '<div class="descripcionEvento">' +
                                    '<div class="date">' + destacados.Fecha +' </div>' +
                                    '<div class="titulo">' + destacados.Titulo +' </div>' +
                                            
                                '</div>' +
                       
                       
                '</a>'+
        '</div></div>');
              
    });

    $('.kol3-carousel').slick({
                              slidesToShow: 1,
                              slidesToScroll: 1,
                              autoplay: true,
                              speed: 300,
                              centerMode: false,
                              arrows: false,
                            });




    $(".eventdesc a").click(function(){
        $('.divload').show();
        Lungo.Router.section("dEvento");
        $('.divload').fadeOut();
    });
};


function getCategorias() {
    
    
    $.each(categorias, function(index, categoria) {
        $('#categoriasSection .contCategorias').append('<a href="#?categoriaid=' + categoria.CatId + '"><div class="categoriaL categoriaID'+ categoria.CatId +'"><div class="imagenLista"><img src="http://' + categoria.Imagen + '"> </div>'+
            '<div class="namenLista" style="border-top: 4px solid #'+ categoria.Color +'">'+ categoria.Nombre +'</div></div></a>');
              
    });
    $("#categoriasSection a").click(function(){
        $('.divload').show();
        Lungo.Router.section("listEvents");
        $('.divload').fadeOut();
    });

    $('#listaCategorias .divload').fadeOut(); 
};

function festivosF() {
        $.jMonthCalendar.AddEvents(festivos);
        $.jMonthCalendar.AddEvents(Especiales);  

};
