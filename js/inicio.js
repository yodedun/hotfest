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

$('.link').live('tap', function() {
    url = $(this).attr("rel");   
    loadURL(url);
});

function loadURL(url){
    navigator.app.loadUrl(url, { openExternal:true });
    return false;
} 

function onBackKeyDown() {
    Lungo.Router.back()
    };


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
        objeto2 = JSON.stringify(events);
        window.sessionStorage['eventos'] = objeto2;
        var eventosParsecache = sessionStorage.getItem('eventos');
        eventsCache = JSON.parse(eventosParsecache);

        window.sessionStorage['categoriascache'] = JSON.stringify(categorias);
        var categoriasParsecache = sessionStorage.getItem('categoriascache');
        categoriasJ = JSON.parse(categoriasParsecache);

        window.sessionStorage['ciudadescache'] = JSON.stringify(ciudadesSelect);
        var ciudadesParsecache = sessionStorage.getItem('ciudadescache');
        ciudadadesJ = JSON.parse(ciudadesParsecache);

        festivo = JSON.stringify(festivos);
        window.localStorage['festivos'] = festivo;
        var festivoL = localStorage.getItem('festivos');
        festivoslocal = JSON.parse(festivoL);

    }
    else{ alert("Upps No tienes conexión a Internet");
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
    $.each(categoriasJ, function(index, categoria) {
        $('#eventos').append('<option class="addcat" value="'+ categoria.CatId +'">'+ categoria.Nombre +'</option>');
              
    });
};

function ciudadesF() {
    $("option.addCity").remove()
    $.each(ciudadadesJ, function(index, ciudad) {
        $('#ciudades').append('<option class="addCity" value="'+ ciudad.CiudadId +'">'+ ciudad.Nombre +'</option>');
              
    });
};


function festivosF() {
    $.jMonthCalendar.AddEvents(festivoslocal);
    $('.DateLabel.festivo .festivo').removeAttr("data-view-section");
    //$('.DateLabel.festivo .festivo').removeAttr("href")
    $('.DateLabel.festivo .festivo').remove("a");
    multievento();
};



function multievento() {

    $('.DateBox > div').each(function(){
  
        if(
            ($(this).attr( 'class' ).split(' ')).length > 3 ){           
            $(this).children( "a " ).children( "div " ).addClass('multievento')
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
        $('.escoge').show();        
        selectedValue = '0';
        $('.bCiudad').addClass("seleccion");
    }
    else{ 
        if(localStorage.getItem('nameciudad')=== '0' ){   
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
    $.jMonthCalendar.ReplaceEventCollection([]);
    console.log(selectedValue);
    
    localStorage['nameciudad'] = selectedValue;
    eventsCiudad  = getObjects(eventsCache, 'CiudadId', selectedValue ); 
        eventsCiudadcache = JSON.stringify(eventsCiudad);
        sessionStorage['eventsCiudad'] = eventsCiudadcache;
        var eventsCiudadParsecache = sessionStorage.getItem('eventsCiudad');
        eventsCiudadJ = JSON.parse(eventsCiudadParsecache); 
        $.jMonthCalendar.Initialize(options, eventsCiudadJ);

    mescache();
    $('#main #divload').hide();
    setTimeout(festivosF, 200);       

                
    $("#ciudades").val(selectedValue)
    $("#ciudades").change(function(){
        $('#main #divload').show();
        $('.bCiudad').removeClass("seleccion");
        $('.escoge').remove();
        selectedValue = $(this).find(":selected").val();
                
        $.jMonthCalendar.ReplaceEventCollection([]);
                           
        console.log(selectedValue);
        localStorage.removeItem('nameciudad');
        localStorage['nameciudad'] = selectedValue;
        eventsCiudad = getObjects(events, 'CiudadId', selectedValue );

        eventsCiudadcache = JSON.stringify(eventsCiudad);
        sessionStorage['eventsCiudad'] = eventsCiudadcache;
        var eventsCiudadParsecache = sessionStorage.getItem('eventsCiudad');
        eventsCiudadJ = JSON.parse(eventsCiudadParsecache); 

        $.jMonthCalendar.Initialize(options, eventsCiudadJ);

        mescache();
        $('#eventos').val(0);
        $('#main #divload').hide();

        
        setTimeout( dates, 100); 
        setTimeout(festivosF, 200);        
    });


    selectedValueE = 0;
    $("#eventos").val(selectedValueE)
    $("#eventos").change(function(){
        $('#main #divload').show();
        selectedValueE = $(this).find(":selected").val();
        console.log(selectedValueE);
        if( selectedValueE == 0 ){  
            localStorage.removeItem('nameevento');
            calendarIni();
        }
        else{ 
            selectedValueE = $(this).find(":selected").val();

            localStorage.removeItem('namecategoria');
            $.jMonthCalendar.ReplaceEventCollection([]);
            localStorage['namecategoria'] = selectedValueE;
            eventsCategoria = getObjects(eventsCiudadJ, 'CategoriaId', selectedValueE );

            eventsCategoriacache = JSON.stringify(eventsCategoria);
            sessionStorage['eventsCategoria'] = eventsCategoriacache;
            var eventsCategoriaParsecache = sessionStorage.getItem('eventsCategoria');
            eventsCategoriaJ = JSON.parse(eventsCategoriaParsecache);

            $.jMonthCalendar.Initialize(options, eventsCategoriaJ);

            mescache();
            backCategoria();
            setTimeout( dates, 100); 
            setTimeout(festivosF, 200);   
        };
        $('#main #divload').hide();
            
    });


};


function backCategoria() {
            selectedValueE = localStorage.getItem('namecategoria');
            $('#eventos').val(selectedValueE);
            events3 = getObjects(eventsCiudadJ, 'CategoriaId', selectedValueE );
            $.jMonthCalendar.Initialize(options, events3);

            mescache();
            setTimeout( dates, 100); 
            setTimeout(festivosF, 200);
        };


function dates() {
    $$(".Event").tap(function(){
        var date= $(this).attr("data-date");
        sessionStorage['date'] = date;

    //alert( $(this).attr("data-date") );
    });
};

function festivoHold() {
    $$(".DateLabel.festivo").hold(function(){
        var dateFestivo= $(this).attr("data-date");
        console.log(dateFestivo);          
        unFestivos = JSON.parse(localStorage.festivos);
        festivoEvento = getObjects(unFestivos, 'Fecha', dateFestivo );
        $.each(festivoEvento , function(index, festivo) {
            unose = festivo.Titulo
        });
        var afterNotification = function(){
        //Do something
        };
        Lungo.Notification.html(
            '<span class="notiF">Festivo </span> <span class="nameFestivo">' + unose + '</span>',                  //Title
            'Cerrar'               
            );
    });
};

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
    eventsDestacados = getObjects(eventsCache, 'Destacado', 1 );
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
    var descripcionEvento = getObjects(eventsCache, 'EventoId', firstID ); 
    employees = descripcionEvento ;
    $.each(employees, function(index, employee) {
        var imagen = "http://";
        var rutaImagen = imagen + employee.Imagen ;
        //$('#test').append(employee.Titulo);
        $('#eventDetails .eventCalendar').append('<p class="line1">' + employee.Titulo + '<span class="bubble"> - ' + employee.CategoriaNombre + '</span></p>' +
            ' <p class="line2"> Fecha: '+ employee.Fecha +' - '+ employee.Hora + '</p> ' + 
            '<p class="line4">Lugar: ' + employee.Direccion + '</p>');
        $('#eventDetails .tituloHora').append('<p class="line3">' + employee.Description + '</p>' );

        $('.imagenEvento').append("<img src='" + rutaImagen + "'/>");
        $('.imagenback').append("<img src='" + rutaImagen + "'/>");

        
        $('#eventDetails').append('<style>.detalles:before{border-top:45px solid' + employee.Color + '}</style>');
        $('.blur').css("background",employee.Color );



        Latitud2 = employee.Latitud;
        Longitud2 = employee.Longitud;
        titulo2 = employee.Titulo;

        $('#bar-btn').append('<div class="btn btn-mapa"> <span class="icon map-marker"></span> Ver Mapa </div>');

        $$(".btn-link").tap(function() {        
                              
                            window.plugins.webintent.startActivity({
                                action: window.plugins.webintent.ACTION_VIEW,
                                url: employee.Url},
                                function() {},
                                function() {alert('Failed to open URL via Android Intent')}
                            );             
        });

         if( employee.Url !== "")
            { $('#bar-btn').append('<a href="'+employee.Url+'" class="btn btn-info"> <span class="icon map-marker"></span> Más info </div>' ); } else{ alert('noURL') };

        if( employee.UrlCompra !== "")
            { $('#bar-btn').append('<a href="'+employee.UrlCompra+'" class="btn btn-link"> <span class="icon map-marker"></span> Link compra </div>'); } else{ console.log('no') };

       


    
        //



            
    });
    console.log('carga');
   $('#dEvento #divload').fadeOut();
};

function botonMapa() {
    $$(".btn-mapa").tap(function() {        
                              
                            window.plugins.webintent.startActivity({
                                action: window.plugins.webintent.ACTION_VIEW,
                                url: 'geo:'+ Latitud2 +','+ Longitud2 +'?q=' + Latitud2 +','+ Longitud2},
                                function() {},
                                console.log('map'),
                                function() {alert('Failed to open URL via Android Intent')}
                            );             
                });
            };




function getEmployeeList() {
    
    fechasUno = sessionStorage.date;
    var firstDate = getUrlVars()["fecha"];
    eventsdate = getObjects(eventsCiudadJ, 'Fecha', sessionStorage.date );
    $('#test').append(sessionStorage.getItem('date'));
    employees = eventsdate ;
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
            '<div class="date">' + employee.Fecha +'</div>' +
            '<div class="titulo">' + employee.Titulo +'</div>  ' +                      
            '<div class="tipoEvento">' + employee.CategoriaNombre + '</div>' +
            '</div>' +
            '<div class="cuadrado"> + </div>' +
                     

                      
            '</div>' +
            '</a>' +
            '</li>');
    

          
    });

    $(".evento").click(function(){
       $('#divload').show();
                        Lungo.Router.section("dEvento");
        $('#divload').fadeOut();
    });
    console.log('carga');
    $('#pull #divload').fadeOut(); 
};


function getCategorias() {
    
    
    $.each(categoriasJ, function(index, categoria) {
        $('#categoriasSection').append('<a href="#?categoriaid=' + categoria.CatId + '"><div class="categoriaL categoriaID'+ categoria.CatId +'"><div class="imagenLista"><img src="http://' + categoria.Imagen + '"> </div>'+
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
        eventsdate = getObjects(eventsCache, 'CategoriaId', categoriaSelect );
    } else if (getUrlVars() == "ciudadId") {
        var categoriaSelect  = getUrlVars()["ciudadId"];
        eventsdate = getObjects(eventsCache, 'CiudadId', categoriaSelect );
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