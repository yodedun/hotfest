 
			
			localStorage.removeItem('nameciudad');
			localStorage['nameciudad'] = selectedValue;
			var events2 = getObjects(events, 'Ciudad', selectedValue ); 


			
			$.jMonthCalendar.Initialize(options, events2);
				mescache();
			 	$('#divload').hide();
				objeto = JSON.stringify(events2);
				sessionStorage['events'] = objeto;
                console.log( sessionStorage.events );

                festivo = JSON.stringify(festivos);
				localStorage['festivos'] = festivo;
				festivoL = localStorage.getItem('festivos');
				festivoslocal = JSON.parse(festivoL);
                console.log( festivoslocal );
 