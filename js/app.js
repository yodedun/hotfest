

var App = (function(lng, undefined) {

    sectionTrigger = function(event) {
        event.stopPropagation();
        setTimeout(function() {
            lng.Notification.success("Event: " + event.type, "Layout events manager", "info", 2);
        }, 500);
    };

    articleTrigger = function(event) {
        event.stopPropagation();
        console.error(event);
    };

    environment = function(event) {
        var environment = lng.Core.environment();
        var el = lng.dom("section > article#environment");

        if (environment.os) {
            el.find("#os > strong").html(environment.os.name);
            el.find("#os > small").html(environment.os.version);
        }
        el.find("#resolution > strong").html(environment.screen.height + "p x " + environment.screen.width + "p");
        el.find("#navigator > strong").html(environment.browser);
        el.find("#navigator > small").html("Mobile: " + environment.isMobile);
    };

    return {
        sectionTrigger: sectionTrigger,
        articleTrigger: articleTrigger,
        environment: environment
    };

})(Lungo);



Lungo.dom('#main').on('load', function(event) {
     $('#main #divload').show();
    calendarIni();
    $('#employeeList li ').remove('li');
    $('#eventDetails .tituloHora p').remove('*');


});

Lungo.dom('#main').on('unload', function(event) {
    $('#eventos .add').remove('*');

});



Lungo.dom('#pull').on('load', function(event){
    $('#pull #divload').show();
     setTimeout( getEmployeeList, 500); 

});



Lungo.dom('#pull').on('unload', function(event) {
    //alert("Unloaded section 1");
    //sessionStorage.removeItem('date');
    sessionStorage.removeItem('eventoDes');
    $('#listfestivos li ').remove('li');
    $('#listEspecial li ').remove('li');
    
    $('#employeeList li ').remove('li');
    $('#eventDetails .tituloHora p').remove('*');

    
});





Lungo.dom('#dEvento').on('unload', function(event) {
    //alert("Unloaded section 1");
    //sessionStorage.removeItem('date');
    sessionStorage.removeItem('eventoDes');
    $('#dEvento #divload').show();
    $('#eventDetails .tituloHora p').remove('*');
    $('#eventDetails .direccion p').remove('*');
    $('#eventDetails .eventCalendar p').remove('*');
    $('.imagenEvento img').remove('*');
    $('.blur img').remove('*');
    $('.blur').css("background","#ffffff" );
    $('#eventDetails style').remove();
    $('#bar-btn .btn').unbind();
    $('#bar-btn .btn').remove();
    
    delete Latitud2,
    delete Longitud2,
    delete titulo2,
    delete window.plugins.webintent.url

    idevent();
});


Lungo.dom('#dEvento').on('load', function(event){
    $('#dEvento #divload').show();
   
    setTimeout( descripcion, 1000);  
    
    idevent();
    
});



Lungo.dom('#listaCategorias').on('load', function(event){
    $('#listaCategorias #divload').show();
     setTimeout( getCategorias, 500); 
});


Lungo.dom('#listaCategorias').on('unload', function(event){

    $('#listaCategorias #divload').show();
     $('#categoriasSection .contCategorias div').remove();

});



Lungo.dom('#listCiudades').on('load', function(event){
    $('#listCiudades #divload').show();
     setTimeout( getCiudades, 500); 
});

Lungo.dom('#listCiudades').on('unload', function(event){

    $('#listCiudades #divload').show();
    $('#ciudadesSection li').remove();

});


Lungo.dom('#listEvents').on('load', function(event){
    $('#listEvents #divload').show();
     setTimeout( listEventosAll, 500); 
});

Lungo.dom('#listEvents').on('unload', function(event){

    $('#listEvents #divload').show();
    $('#employeeListAll li ').remove('li');

});


Lungo.ready(function() {

    $(".calendarioBtn").click(function() {
        $('#divload').show();
            Lungo.Router.section("main");
        $('#divload').fadeOut();
    });





    




//if (!navigator.userAgent.match(/msie/i)) {     
//        var gestures = ['swipeLeft', 'swipeRight'];
//        gestures.forEach(function (type) {
// QuoJS uses $$ so it doesn't conflict with jQuery
//            $$('#jMonthCalendar').on(type, function (ev) {
//                ev.preventDefault();
 
// disable scrolling
//                $('body').bind('touchmove', function (e) {
//                    e.preventDefault();
//                });
 
//                switch (type) {
//                    case 'swipeLeft':
//                         jQuery.J.ChangeMonth(nextMonth2);
//            localStorage['datemes'] = actual;
//                            setTimeout( dates, 100);
//                            setTimeout( festivosF, 100);
//            return false;  
//                        break;
//                    case 'swipeRight':
//                        jQuery.J.ChangeMonth(prevMonth2);
//            localStorage['datemes'] = actual;
//                            setTimeout( dates, 100);
//                            setTimeout( festivosF, 100);
//            return false;  
//                        break;
//                }
//            });
//        });
//    }


});