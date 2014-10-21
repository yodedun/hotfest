var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        document.addEventListener("backbutton", onBackKeyDown, false);


    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        navigator.splashscreen.hide()
    },


    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


var el = $$('[data-control=carousel2]')[0];
var example = Lungo.Element.Carousel(el, function(index, element) {
    Lungo.dom("section#carousel .title span").html(index + 1);
});



function loadURL(url){
    navigator.app.loadUrl(url, {
        openExternal:true
    });
    return false;
} 

function onBackKeyDown() {
    Lungo.Router.back()
};


$(".empezar").click(function() {
    $('#addtour5').fadeOut();
});
$(".cerrar").click(function() {
    $('#addtour5').fadeOut();
});

$$(".forTour").tap(function() {
    Lungo.Router.section("main");
    $('#addtour5').fadeIn();
});

$("#hoy").click(function() {
    $('#divload').show();
    $.jMonthCalendar.ChangeMonth(new Date());
    localStorage['datemes'] = actual;
    $('#divload').fadeOut();
    return false;

});

//window.plugin.notification.local.add({
//    id:      1,
//    title:   'Reminder',
//    message: 'Dont forget to buy some flowers.',
//    repeat:  'weekly',
//    date:    _60_seconds_from_now
//});

//$(".calendarioBtn").click(function() {
//    $('#divload').show();
//    Lungo.Router.section("main");
//    $('#divload').fadeOut();
//
//});


function eventosIni() {


    if(typeof(events) != "undefined"){           
        
    }
    else{
        alert("Upps No tienes conexión a Internet");
        var beventos = localStorage.getItem('eventos');
        events = JSON.parse(beventos);
    };


    if(getUrlVars() == "id"){           
        $('#divload').show();
        Lungo.Router.section("dEvento");
        $('#divload').fadeOut();
    }
    else{ 
        setTimeout( calendarIni, 120 );
    };
                

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


function festivosF() {
    
    //$('.DateLabel.festivo .festivo').removeAttr("data-view-section");
    //$('.DateLabel.festivo .festivo').removeAttr("href")
    //$('.DateLabel.festivo .festivo').remove("a");
    
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
        };
    };
        
};

function categoriacache() {
    if(localStorage.getItem('namecategoria')== null ){   
             
        selectedValueE = '0';
       
    }
    else{ 
        if(localStorage.getItem('namecategoria')=== '0' ){   
       
            selectedValueE = '0';
    
        }
        else{ 
         
            selectedValueE =localStorage.getItem('namecategoria');
        };
    };
        
};

function marc() {
        
    $$("#test").tap(function(){
          
        var afterNotification = function(){
        //Do something
        };
        Lungo.Notification(
            "HOTFEST",                  //Title
            "LA APP CON LOS MEJORES EVENTOS EN LOS MEJORES SITIOS",     //Description
            "star",                    //Icon
            7, 
            "Close" ,                      //Time on screen
            afterNotification           //Callback function
            );

    });
};



function diaHoy() {

    $('#divload').show();
    $.jMonthCalendar.ChangeMonth(new Date());
    localStorage['datemes'] = actual;
    $('#divload').fadeOut();
    return false;

};

function calendarioNormal() {
         
    $.jMonthCalendar.ChangeMonth(new Date()) ;
    $('#divload').fadeOut();
};



function calendarIni() {
    $('#main #divload').show();
    ciudadesF();
    categoriasF();
    ciudadcache();
    categoriacache();
    
    $.jMonthCalendar.ReplaceEventCollection([]);

    console.log(selectedValue);
    
    localStorage['nameciudad'] = selectedValue;
    eventsCiudad  = getObjects(events, 'CiudadId', selectedValue ); 
 
    $.jMonthCalendar.Initialize(options, eventsCiudad);
    $.jMonthCalendar.AddEvents(festivos);
    $.jMonthCalendar.AddEvents(Especiales);

    eventsCiudad  = getObjects(events, 'CiudadId', selectedValue ); 
     eventsCategoria = eventsCiudad;
    mescache();
    $('#main #divload').hide();      
    multievento(); 
                
    $("#ciudades").val(selectedValue)
    $("#ciudades").change(function(){
        $('#main #divload').show();
        $('.bCiudad').removeClass("seleccion");
        $('.escoge').remove();
        selectedValue = $(this).find(":selected").val();
            selectedValueE = 0; 
            localStorage.removeItem('namecategoria'); 

        $.jMonthCalendar.ReplaceEventCollection([]);
                           
        console.log(selectedValue);
        localStorage.removeItem('nameciudad');
        localStorage['nameciudad'] = selectedValue;
        eventsCiudad = getObjects(events, 'CiudadId', selectedValue );        
        $.jMonthCalendar.Initialize(options, eventsCiudad);

        

            $.jMonthCalendar.AddEvents(festivos);
            $.jMonthCalendar.AddEvents(Especiales);


        multievento();
        
        mescache();
        eventsCiudad = getObjects(events, 'CiudadId', selectedValue ); 
        $('#eventos').val(0);
        $('#main #divload').hide();

        
        setTimeout( dates, 100);      
    });


    
    if(typeof(selectedValueE) === "undefined" ){   
       
        selectedValueE = 0;
            
    }
    else{ 
         
        selectedValueE =localStorage.getItem('namecategoria');


            
    };
    setTimeout(antesCategoria, 100); 
    $("#eventos").val(selectedValueE)
    $("#eventos").change(function(){
        $('#main #divload').show();
        selectedValueE = $(this).find(":selected").val();
            
        
        if( selectedValueE == 0 ){  
            localStorage.removeItem('nameevento');
            localStorage.removeItem('namecategoria');
            
            calendarIni()
            
                
            multievento();
            eventsCiudad = getObjects(events, 'CiudadId', selectedValue );    
              eventsCategoria = eventsCiudad;
            

        }
        else{ 
            selectedValueE = $(this).find(":selected").val();

            localStorage.removeItem('namecategoria');
            $.jMonthCalendar.ReplaceEventCollection([]);
            eventsCiudad = getObjects(events, 'CiudadId', selectedValue );    
            localStorage['namecategoria'] = selectedValueE;
            eventsCategoria = getObjects(eventsCiudad, 'CategoriaId', selectedValueE );

            $.jMonthCalendar.Initialize(options, eventsCategoria);

            $.jMonthCalendar.AddEvents(festivos);
            $.jMonthCalendar.AddEvents(Especiales);
             eventsCategoria = getObjects(eventsCiudad, 'CategoriaId', selectedValueE );  
            mescache();
            multievento(); 
            //backCategoria();
            setTimeout( dates, 100); 
        };
        $('#main #divload').hide();
            
    });


};
function antesCategoria() {
    $('#eventos option[value="'+selectedValueE+'"]').prop('selected', true).change();
};

function backCategoria() {
    selectedValueE = localStorage.getItem('namecategoria');
    $('#eventos').val(selectedValueE);
        $.jMonthCalendar.ReplaceEventCollection([]);
    eventsCiudadold = getObjects(eventsCiudad, 'CategoriaId', selectedValueE );
       
            $.jMonthCalendar.Initialize(options, eventsCiudadold);
        $.jMonthCalendar.ReplaceEventCollection([]);
            $.jMonthCalendar.AddEvents(festivos);
            $.jMonthCalendar.AddEvents(Especiales);
            multievento(); 
            
    mescache();
    setTimeout( dates, 100);
};


function dates() {
    $$(".conEvent").tap(function(){
        var date= $(this).attr("data-date");
        sessionStorage['date'] = date;

    //alert( $(this).attr("data-date") );
    });
};

//function festivoHold() {
//    $$(".DateLabel.festivo").hold(function(){
//        var dateFestivo= $(this).attr("data-date");
//        console.log(dateFestivo);          
//        unFestivos = JSON.parse(localStorage.festivos);
//        festivoEvento = getObjects(unFestivos, 'Fecha', dateFestivo );
//        $.each(festivoEvento , function(index, festivo) {
//            unose = festivo.Titulo
//        });
//        var afterNotification = function(){
        //Do something
//        };
//        Lungo.Notification.html(
//            '<span class="notiF">Festivo </span> <span class="nameFestivo">' + unose + '</span>',                  //Title
//            'Cerrar'               
//            );
//    });
//};

function flecha() {

    $$(".flecha").tap(function(){
        $('#eventoDestacado').animate({
            bottom:"40px"
        }, 500 );
        setTimeout(function () { 
            $('#eventoDestacado .flecha').addClass('bajar');
            $('#eventoDestacado .flecha').removeClass('flecha');
        }, 1100);
    });

    $$(".bajar").tap(function(){
        $('#eventoDestacado').animate({
            bottom:"-15px"
        }, 500 );
        $('#eventoDestacado .bajar').addClass('flecha');
        $('#eventoDestacado .bajar').removeClass('bajar');

    });

       
};


function idevent() {

};
    
function showAndroidToast(toast) {
    Android.showToast(toast);
};

    

function eventodestacado() {
    eventsDestacados = getObjects(events, 'Destacado', 1 );
    $.each(eventsDestacados, function(index, destacados) {
        $('#addcarusel').append('<div align="center" class="eventdesc"> <span>Evento Destacado</span>'+ 
            '<a href="#?id=' + destacados.EventoId + '" data-view-section="dEvento">' +
            '<ul style="background: ' + destacados.Color +'"><li class="evento" data-id="' + destacados.EventoId + '"><div class="imgEvent" style="border-right: 4px solid ' + destacados.Color +'">' +
            '<img src="http://' + destacados.Imagen + '">' +
            '</div> ' +
            '<div class="descripcionEvento">' +
            '<div class="titulo">' + destacados.Titulo +' </div>' +
            '<div class="date">' + destacados.Fecha +' </div>' +
            '</div>' +
            '</li></ul></a></div>');
              
    });

    var el = $$('[data-control=carousel]')[0];
    var example = Lungo.Element.Carousel(el, function(index, element) {
        Lungo.dom("section#carousel .title span").html(index + 1);
    });

    var el = $$('[data-control=carousel]')[0];
    var example = Lungo.Element.Carousel(el, function(index, element) {
        });
    setInterval(example.next, 5000);


    $(".eventdesc a").click(function(){
        $('#divload').show();
        Lungo.Router.section("dEvento");
        $('#divload').fadeOut();
    });
};





function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
};


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
};

function descripcion() {
    var firstID = getUrlVars()["id"];
    var descripcionEvento = getObjects(events, 'EventoId', firstID ); 
    employees = descripcionEvento[0] ;
   
    var imagen = "http://";
    var rutaImagen = imagen + employees.Imagen ;
    //$('#test').append(employee.Titulo);
    $('#eventDetails .eventCalendar').append('<p class="line1">' + employees.Titulo + '<span class="bubble"> - ' + employees.CategoriaNombre + '</span></p>' +
        ' <p class="line2"> Fecha: '+ employees.Fecha +' - '+ employees.Hora + '</p> ' + 
        '<p class="line4">' + employees.Ciudad + '</p>' +
        '<p class="line4">Lugar: ' + employees.Escenario + '</p>'+
        '<p class="line4"> ' + employees.Direccion + '</p>');
    $('#eventDetails .tituloHora').append('<p class="line3">' + employees.Description + '</p>' );

    $('.imagenEvento').append("<img src='" + rutaImagen + "'/>");
    $('.imagenback').append("<img src='" + rutaImagen + "'/>");

        
    $('#eventDetails').append('<style>.detalles:before{border-top:45px solid' + employees.Color + '}</style>');
    $('.blur').css("background",employees.Color );



    Latitud2 = employees.Latitud;
    Longitud2 = employees.Longitud;
    titulo2 = employees.Titulo;
    urlNormal = employees.Url
    urlCompra = employees.UrlCompra

    $('#bar-btn').append('<div class="btn btn-mapa"> <span class="icon map-marker"></span> Ver Mapa </div>');
    myFunction();

    function myFunction() {


            

            if( employees.Url !== "")
            {
                $('#bar-btn').append('<a class="btn btn-link"> <span class="icon map-marker"></span> Más info </div>' );
            } else{
                console.log('no')
            };

            if( employees.UrlCompra !== "")
            {
                $('#bar-btn').append('<a class="btn btn-compra"> <span class="icon map-marker"></span> Link compra </div>');
            } else{
                console.log('no')
            };




    } 


    console.log('carga');
    $('#dEvento #divload').fadeOut();
};



$$(".btn-link" ).tap(function() {        
                                      
            window.open(''+ urlNormal  +'', "_system");
                                              
            });
$$(".btn-compra").tap(function() {        
                                      
                window.open(''+ urlCompra +'', "_system");
                                              
            });

$$(".btn-mapa").tap(function() {        
                    console.log('map'),
                    window.plugins.webintent.startActivity({
                        action: window.plugins.webintent.ACTION_VIEW,
                        url: 'geo:'+ Latitud2 +','+ Longitud2 +'?q=' + Latitud2 +','+ Longitud2
                        },

                    function() {},
                        function() {
                            alert('Failed to open URL via Android Intent')
                            }
                        );   
                                  
                });


function getEmployeeList() {
    
    fechasUno = sessionStorage.date;
    var firstDate = getUrlVars()["fecha"];
    eventsdate = getObjects(eventsCategoria, 'Fecha', sessionStorage.date ); 
    $.jMonthCalendar.ReplaceEventCollection([]);   
    festivosdate = getObjects(festivos, 'Fecha', sessionStorage.date );
    Especialdate = getObjects(Especiales, 'Fecha', sessionStorage.date );

    $('#test').append(sessionStorage.getItem('date'));
    employees = eventsdate ;
    $.each(festivosdate, function(index, festivodate) {
        $('#listfestivos').append('<li class=" ' + festivodate.CssClass + '" data-id="' + festivodate.FestivoId + '">' +
            '<div class="descripcionEvento id' + festivodate.FestivoId + '" >' +
            '<div class="date">' + festivodate.Fecha +'</div>' +
            '<div class="titulo">' + festivodate.Titulo +'</div>  ' +                      
            '<div class="tipoEvento">' + festivodate.Categoria + '</div>' +
            '</div>' +
                     

                      
            '</div>' +
            '</li>');
              
    });


    $.each(Especialdate, function(index, festivodate) {
        $('#listEspecial').append('<li class=" ' + festivodate.CssClass + '" data-id="' + festivodate.FestivoId + '">' +
            '<div class="descripcionEvento id' + festivodate.FestivoId + '" >' +
            '<div class="date">' + festivodate.Fecha +'</div>' +
            '<div class="titulo">' + festivodate.Titulo +'</div>  ' +                      
            '<div class="tipoEvento">' + festivodate.Categoria + '</div>' +
            '</div>' +
                     

                      
            '</div>' +
            '</li>');
              
    });

    $.each(employees, function(index, employee) {
        $('#employeeList').append('<li class="evento" data-id="' + employee.EventoId + '">' +
            '<a href="#?id=' + employee.EventoId + '"  dataId="' + employee.EventoId + '">' +
            '<div class="eventlist" style="background: ' + employee.Color +'">' +
            '<div class="imgEvent" style="border-bottom: 4px solid ' + employee.Color +'"><img src="http://' + employee.Imagen + '">' +
            '</div>' +
            '<style type="text/css"> ' +
            '#employeeList .descripcionEvento.id' + employee.EventoId + ':before {' +
            'border-top: 20px solid transparent;' +
            'border-left: 20px solid transparent;' +
            'border-bottom: 20px solid' + employee.Color +';' +
            'border-right: 20px solid transparent;' +
            '}' +
            '</style>' +
            '<div class="descripcionEvento id' + employee.EventoId + '" >' +
            '<div class="date">' + employee.Fecha +' - ' + employee.Ciudad +'</div>' +
            '<div class="titulo">' + employee.Titulo +'</div>  ' +                      
            '<div class="tipoEvento">' + employee.CategoriaNombre + '</div>' +
            '</div>' +
            '<div class="cuadrado"> + </div>' +
                     

                      
            '</div>' +
            '</a>' +
            '</li>');
              
    });

    
    console.log('cargalisteventos');

    $(".evento").click(function(){
        $('#divload').show();
        Lungo.Router.section("dEvento");
        $('#divload').fadeOut();
    });

    $('#pull #divload').fadeOut(); 
};


function getCategorias() {
    
    
    $.each(categoriasJ, function(index, categoria) {
        $('#categoriasSection .contCategorias').append('<a href="#?categoriaid=' + categoria.CatId + '"><div class="categoriaL categoriaID'+ categoria.CatId +'"><div class="imagenLista"><img src="http://' + categoria.Imagen + '"> </div>'+
            '<div class="namenLista" style="border-top: 4px solid #'+ categoria.Color +'">'+ categoria.Nombre +'</div></div></a>');
              
    });
    $("#categoriasSection a").click(function(){
        $('#divload').show();
        Lungo.Router.section("listEvents");
        $('#divload').fadeOut();
    });

    $('#listaCategorias #divload').fadeOut(); 
};


function getCiudades() {
    
    
    $.each(ciudadadesJ, function(index, ciudadades) {
        $('#ciudadesSection ul').append('<li class="arrow"><a href="#?ciudadId=' + ciudadades.CiudadId + '"><div class="categoriaL categoriaID'+ ciudadades.CiudadId +'">'+
            '<div class="namenLista">'+ ciudadades.Nombre +'</div></div></a></li>');
              
    });
    $("#ciudadesSection a").click(function(){
        $('#divload').show();
        Lungo.Router.section("listEvents");
        $('#divload').fadeOut();
    });

    $('#listCiudades #divload').fadeOut(); 
};


function listEventosAll() {

    if (getUrlVars() == "categoriaid") {
        var categoriaSelect  = getUrlVars()["categoriaid"];
        eventsdate = getObjects(events, 'CategoriaId', categoriaSelect );
    } else if (getUrlVars() == "ciudadId") {
        var categoriaSelect  = getUrlVars()["ciudadId"];
        eventsdate = getObjects(events, 'CiudadId', categoriaSelect );
    }

    $('#test').append(sessionStorage.getItem('date'));
    employees = eventsdate ;
    $.each(employees, function(index, employee) {
        $('#employeeListAll').append('<li class="evento eventoAl" data-id="' + employee.EventoId + '">' +
            '<a href="#?id=' + employee.EventoId + '"  dataId="' + employee.EventoId + '">' +
            '<div class="eventlist" style="background: ' + employee.Color +'">' +
            '<div class="imgEvent" style="border-bottom: 4px solid ' + employee.Color +'"><img src="http://' + employee.Imagen + '">' +
            '</div>' +
            '<style type="text/css"> ' +
            '#employeeList .descripcionEvento.id' + employee.EventoId + ':before {' +
            'border-top: 20px solid transparent;' +
            'border-left: 20px solid transparent;' +
            'border-bottom: 20px solid' + employee.Color +';' +
            'border-right: 20px solid transparent;' +
            '}' +
            '</style>' +
            '<div class="descripcionEvento id' + employee.EventoId + '" >' +
            '<div class="date">' + employee.Fecha +'</div>' +
            '<div class="titulo">' + employee.Titulo +'</div>  ' +                      
            '<div class="tipoEvento">' + employee.CategoriaNombre + '</div>' +
            '</div>' +
            '<div class="cuadrado"> + </div>' +
                     

                      
            '</div>' +
            '</a>' +
            '</li>');
    

          
    });
    $(".eventoAl").click(function(){
        $('#divload').show();
        Lungo.Router.section("dEvento");
        $('#divload').fadeOut();
    });
    console.log('carga');
    $('#listEvents #divload').fadeOut(); 
};