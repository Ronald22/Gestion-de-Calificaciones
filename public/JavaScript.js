
$(document).ready(function(){ 
	bandera = false
	//genera el formulario de asignatura al hacer click en el boton ingreso de asignatura 
	$("#btnasignatura").click(function(){
		var asignatura ='<hr id="hr"><section id="sectionindex"><h2 id="h2asignatura">INGRESO DE ASIGNATURAS</h2><article id="box">'
			asignatura+='<form id="formasignatura" action=""><table><tr><td><label class="labelasignatura" for="codigo">Código</label></td><td><input class="inputasignatura1" type="text" value="" name="codigo" id="txtcodigo" placeholder="codigo de la asignatura">'
			asignatura+='</td><td id="trcodigo"></td></tr><tr><td><label class="labelasignatura" for="asignatura">Asignatura</label></td>'
			asignatura+='<td><input class="inputasignatura" type="text" value="" name="asignatura" id="txtasignatura" placeholder="nombre de la asignatura" required>'
			asignatura+='</td><td id="trAsignatura"></td></tr><tr><td><label class="labelasignatura" for="docente">Docente</label></td><td>'
			asignatura+='<input class="inputasignatura" type="text" value="" name="docente" id="txtdocente" placeholder="nombre del docente" required></td>'
            asignatura+='<td id="trdocente"></td></tr><tr><td><label class="labelasignatura" for="creditos">Créditos</label></td><td>'
            asignatura+='<input class="inputasignatura1" type="text" value="" name="credito" id="txtcredito" placeholder="créditos de la asignatura"></td><td id="trcredito"></td></tr>'
            asignatura+='</table><input type="button" value="Enviar" id="btnenviar" class="btnCrud"><input type="button" value="Consultar" id="btnconsultar" class="btnCrud">'
            asignatura+=''
            asignatura+='</form></article><article class="contenido2" ></article></section>'
		$("#contenido").html(asignatura)

		//valida el ingreso de solo letras en la entrada "asignatura" y "docente"
		$(".inputasignatura").each(function() {
			$(this).keypress(function(event){			
				key = event.keyCode || event.which;
				tecla = String.fromCharCode(key).toLowerCase();
				letras = " áéíóúabcdefghijklmnñopqrstuvwxyz.";
				especiales = "38-37-39-40";
				tecla_especial = false
				for(var i in especiales){
					if(key == especiales[i]){
						tecla_especial = true;
						break;
		            }
		        }
		        if(letras.indexOf(tecla)==-1 && !tecla_especial){ return false }	        
			})
		})
		//valida el ingreso de solo números en la entrada "credito"
		$(".inputasignatura1").keypress(function(event){			
			key = event.keyCode || event.which;
			tecla = String.fromCharCode(key).toLowerCase();
			numeros = "1234567890";
			especiales = "38-37-39-46";
			tecla_especial = false
			for(var i in especiales){
				if(key == especiales[i]){
					tecla_especial = true;
					break;
	            }
	        }if(numeros.indexOf(tecla)==-1 && !tecla_especial){return false}
		})

		//agrega efectos de validación en el formulario asignatura
		$("#txtcodigo").keyup(function(){
			$("#trcodigo").html('')
			if ($("#txtcodigo").val()== ""){
	        	$("#txtcodigo").css({"box-shadow" : "" , "border-color" : ""})
	        }
	        else { $("#txtcodigo").css({"border-color": "#28921f", 'box-shadow': '0 0 5px #5cd053' }) }
		})
		$("#txtasignatura").keyup(function(){
			$("#trAsignatura").html('')
			if ($("#txtasignatura").val()== ""){
	        	$("#txtasignatura").css({"box-shadow" : "" , "border-color" : ""})
	        }
	        else { $("#txtasignatura").css({"border-color": "#28921f", 'box-shadow': '0 0 5px #5cd053' }) }
		})
		$("#txtdocente").keyup(function(){
			$("#trdocente").html('')
			if ($("#txtdocente").val()== ""){
	        	$("#txtdocente").css({"box-shadow" : "" , "border-color" : ""})
	        }
	        else { $("#txtdocente").css({"border-color": "#28921f", 'box-shadow': '0 0 5px #5cd053' }) }
		})
		$("#txtcredito").keyup(function(){
			$("#trcredito").html('')
			if ($("#txtcredito").val()== ""){
	        	$("#txtcredito").css({"box-shadow" : "" , "border-color" : ""})
	        }
	        else { $("#txtcredito").css({"border-color": "#28921f", 'box-shadow': '0 0 5px #5cd053' }) }
		})

		//Metodo Insertar y Modificar Datos
		$("#btnenviar").click(function(){	
			var bandera1 = false , bandera2 = false 
			var codigo = $("#txtcodigo").val()
			var asignatura = $("#txtasignatura").val()
			var docente = $("#txtdocente").val()
			var creditos = $("#txtcredito").val()
			var idmodificar=$("#modificarEliminar").val();
			//utilizamos una bandera, si es falsa se realiza el proceso de insertar datos  
			if (bandera == false) {
				$.ajax({
					type:"GET",
					url:"http://gestiondecalificacionesfacci.azurewebsites.net/Asignatura",
					dataType:"json",
					contentType:"text/plain"
				}).done(function(msg){
					//recorre y compara los valores de entrada con los datos de la BD para impedir datos repetidos
					for(var dato in msg[0]){
						if (msg[0][dato].Id == codigo){bandera1 = true}
						if (msg[0][dato].Asignatura == asignatura){bandera2 = true}
					}	
					//utilizamos dos banderas mas, si son verdaderas nos muestra la alerta de ingresar nuevos datos
					if (bandera1 == true && bandera2 == true) {alert("El código y la Asignatura ya estan registrados en el sistema,por favor ingrese nuevos datos")}
					else{
						if (bandera1 == true) {alert("El código ya esta registrado en el sistema,por favor ingrese un nuevos código")}
						else{
							if (bandera2 == true){alert("La asignatura ya esta registrada en el sistema,por favor ingrese una nueva asignatura")}
							else{
								//si las banderas son falsas comienza el proceso de validación e inserción de datos 
								if (asignatura!="" && docente!="" && creditos!="" && codigo!="") {				
									datos = {Asignatura:asignatura , Creditos:creditos , Docente:docente , Id:codigo}				
									$.ajax({
							           	type:"POST",
							           	url:"http://gestiondecalificacionesfacci.azurewebsites.net/Asignatura",
							            dataType:"text",
							            contentType:"application/json",
							            data: JSON.stringify(datos)
							        }).done(function(msg){	  

							        });
							        alert("Sus datos se ingresaron con éxito")
							        $("#txtasignatura").val(""); $("#txtdocente").val(""); $("#txtcredito").val("")	; $("#txtcodigo").val("")
									$("#txtcodigo").css({"box-shadow" : "" , "border-color" : ""})
									$("#txtasignatura").css({"box-shadow" : "" , "border-color" : ""})
									$("#txtdocente").css({"box-shadow" : "" , "border-color" : ""})
									$("#txtcredito").css({"box-shadow" : "" , "border-color" : ""})		
								}
								//valida campos vacios
								else{
									if (codigo=="") {
										$("#txtcodigo").css({"border-color": "red" , 'box-shadow': '0 0 5px #d45252'})
										$("#trcodigo").html('<td><div class="div"></div></td><td class="tdValidarAsignatura">Ingrese un dato por favor</td>')
									}	
									if (asignatura=="") {
										$("#txtasignatura").css({"border-color": "red" , 'box-shadow': '0 0 5px #d45252'})
										$("#trAsignatura").html('<td><div class="div"></div></td><td class="tdValidarAsignatura">Ingrese un dato por favor</td>')
									}	
									if (docente=="") {
										$("#txtdocente").css({"border-color": "red" , 'box-shadow': '0 0 5px #d45252'})
										$("#trdocente").html('<td><div class="div"></div></td><td class="tdValidarAsignatura">Ingrese un dato por favor</td>')
									}
									if (creditos=="") {
										$("#txtcredito").css({"border-color": "red" , 'box-shadow': '0 0 5px #d45252'})
										$("#trcredito").html('<td><div class="div"></div></td><td class="tdValidarAsignatura">Ingrese un dato por favor</td>')
									}	
								}
							}
						}
					}
				})
			}
			//si la primer bandera es verdadera realiza el proceso de modificar datos 
			if (bandera == true) {
				
				datos={"Id":idmodificar , Asignatura:asignatura , Creditos:creditos , Docente:docente};
				$.ajax({
				    type:"PUT",
					url:"http://gestiondecalificacionesfacci.azurewebsites.net/Asignatura",
					dataType:"text",
					contentType:"application/json",
					data:JSON.stringify(datos)
				}).done(function(msg){
					alert(msg);					        
				});	
				$("#modificarEliminar").val("")
				$("#txtcodigo").removeAttr("disabled", "true")
				$("#txtasignatura").val(""); $("#txtdocente").val(""); $("#txtcredito").val("")	; $("#txtcodigo").val("")					
				bandera = false
			}											
		})	

		$("#btnconsultar").click(function(){
			var tablaAsignatura ='<hr id="hr"><h2 id="h2asignatura">CONSULTA DE ASIGNATURAS</h2><article id="box"><input type="button" value="Eliminar" id="btneliminar" class="btnCrud2"><input type="button" value="Modificar" id="btnmodificar" class="btnCrud2"><input class="inputasignatura1" type="text" id="modificarEliminar" size="14px" placeholder="Ingrese el codigo del dato a eliminar o modificar">'
				tablaAsignatura+='<table border="1px" class="tablaConsulta"><tr><th class="thcalificacion">Código</th><th class="thcalificacion">Asignatura</th><th class="thcalificacion">Docente</th><th class="thcalificacion">Creditos</th></tr>'
			$.ajax({
	            type:"GET",
	            url:"http://gestiondecalificacionesfacci.azurewebsites.net/Asignatura",
	            dataType:"json",
	            contentType:"text/plain"
            }).done(function(msg){
			   	for(var dato in msg[0]){
			   		tablaAsignatura+='<td>'+msg[0][dato].Id+'</td>'
				   	tablaAsignatura+='<td>'+msg[0][dato].Asignatura+'</td>'
					tablaAsignatura+='<td>'+msg[0][dato].Docente+'</td>'
					tablaAsignatura+='<td>'+msg[0][dato].Creditos+'</td>'
					tablaAsignatura+='</tr>'
				} 
				tablaAsignatura+='</table></article>'	
			 	$(".contenido2").html(tablaAsignatura)
			 	$("#modificarEliminar").focus()
				$("#txtcodigo").removeAttr("disabled", "true")
			    $("#txtasignatura").val(""); $("#txtdocente").val(""); $("#txtcredito").val("")	; $("#txtcodigo").val("")

			 	$("#btnmodificar").click(function(){
			        var idmodificar=$("#modificarEliminar").val();
			        $.ajax({
				        type:"GET",
				        url:"http://gestiondecalificacionesfacci.azurewebsites.net/Asignatura",
				        dataType:"json",
				        contentType:"text/plain"
			        }).done(function(msg){
						for(var dato in msg[0]){
						    if (msg[0][dato].Id == idmodificar) {
								$("#txtasignatura").val(msg[0][dato].Asignatura)
								$("#txtdocente").val(msg[0][dato].Docente)
								$("#txtcredito").val(msg[0][dato].Creditos)
								$("#txtcodigo").val(msg[0][dato].Id); 
							}														
					 	}
					 	$("#txtcodigo").attr("disabled", "true");
						$("#txtasignatura").focus();
						bandera = true 
					}) 								    
			    });
			    $("#btneliminar").click(function(){
				        var ideliminar=$("#modificarEliminar").val();                
				        datos={"Id":ideliminar};

				        $.ajax({
				            type:"DELETE",
				            url:"http://gestiondecalificacionesfacci.azurewebsites.net/Asignatura",
				            dataType:"text",
				            contentType:"application/json",
				            data:JSON.stringify(datos)
				        }).done(function(msg){
				            alert(msg);
				        });
				        $("#modificarEliminar").val("")
					    $("#txtcodigo").removeAttr("disabled", "true")
					    $("#txtasignatura").val(""); $("#txtdocente").val(""); $("#txtcredito").val("")	; $("#txtcodigo").val("")
				});
			});			      
        });    
	});


	        
	//genera el formulario de Estudiantes al hacer click en el boton ingreso de estudiantes 
	$("#btnestudiante").click(function(){
		var estudiante ='<hr id="hr"><section id="sectionindex"><h2 id="h2estudiante">INGRESO DE ESTUDIANTES</h2><article id="box"><form id="formestudiante" action=""><table>'
			estudiante+='<tr><td><label class="labelestudiante" for="nombres">Nombres</label></td><td><input class="inputestudiante" type="text" value="" name="nombre" id="txtnombre" placeholder="nombre del estudiante" required></td><td id="tdNombre"></td></tr>'
			estudiante+='<tr><td><label class="labelestudiante" for="apellidos">Apellidos</label></td><td><input class="inputestudiante" type="text" value="" name="apellidos" id="txtapellidos" placeholder="apellidos del estudiante"required></td><td id="tdApellido"></td></tr>'
			estudiante+='<tr><td><label class="labelestudiante" for="cedula">Cédula</label></td><td><input class="inputestudiante1" type="text" maxlength="10" minlength="10" value="" name="cedula" id="txtcedula" placeholder="0123456789" required></td><td id="tdCedula"></td></tr>'
			estudiante+='<tr><td><label class="labelestudiante" for="correo">Correo</label></td><td><input class="inputestudiante" type="email" value="" name="correo" id="txtcorreo" placeholder="asd@asd.asd" required></td><td id="tdcorreo"></td></tr>'
			estudiante+='<tr><td><label class="labelestudiante" for="telefono">Telefono</label></td><td><input class="inputestudiante1" type="text" value="" name="telefono" id="txttelefono" placeholder="ingrese su numero de telefono" required></td><td id="tdtelefono"></td></tr></table>'
			estudiante+='<table><tr><td><label class="labelestudiante" for="Nivel">Curso</label></td><td><input class="inputestudiante" type="text" value="" name="curso" id="txtcurso" placeholder="curso del estudiante" required></td><td id="tdcurso"></td></tr>'
			estudiante+='<tr><td><label class="labelestudiante" for="paralelo">Paralelo</label></td><td><select class="inputestudiante" id="txtparalelo" required><option value="1"  selected>Elija un paralelo</option><option value="A">A</option><option value="B">B</option></select></td><td id="tdParalelo"></td></tr>'
			estudiante+='<tr><td><label class="labelestudiante" for="FechantoNAcimie">Fecha de Nacimiento</label></td><td><input class="inputestudiante1" type="date" value="" name="fecha" id="txtfecha" placeholder="DD/MM/AA" required></td><td id="tdfecha"></td></tr>'
			estudiante+='</table><input type="button" value="Enviar" id="btnenviar" class="btnCrud"><input type="button" value="Consultar" id="btnconsultar" class="btnCrud">'
			estudiante+='</form></article></section>'
		$("#contenido").html(estudiante)

		//valida el ingreso de solo letras en la entrada "nombres" y "apellidos"
		$(".inputestudiante").each(function() {
			$(this).keypress(function(event){			
				key = event.keyCode || event.which;
				tecla = String.fromCharCode(key).toLowerCase();
				letras = " áéíóúabcdefghijklmnñopqrstuvwxyz.";
				especiales = "8-37-39-46";
				tecla_especial = false
				for(var i in especiales){
					if(key == especiales[i]){
						tecla_especial = true;
						break;
		            }
		        }
		        if(letras.indexOf(tecla)==-1 && !tecla_especial){ return false }	        
			})
		})
		//valida el ingreso de solo números en la entrada "credito"
		$(".inputestudiante1").keypress(function(e){
			key = e.keyCode || e.which;
			tecla = String.fromCharCode(key).toLowerCase();
			numeros = " 1234567890";
			especiales = "8-37-39-46";
			tecla_especial = false
			for(var i in especiales){
				if(key == especiales[i]){
					tecla_especial = true;
					break;
	            }
	        }
	        if(numeros.indexOf(tecla)==-1 && !tecla_especial){return false}
		})

		//agrega efectos de validación en el formulario asignatura
		$("#txtnombre").keyup(function(){
			$("#tdNombre").html('')
			if ($("#txtnombre").val()== ""){
	        	$("#txtnombre").css({"box-shadow" : "" , "border-color" : ""})
	        }
	        else { $("#txtnombre").css({"border-color": "#28921f", 'box-shadow': '0 0 5px #5cd053' }) }
		})
		$("#txtapellidos").keyup(function(){
			$("#tdApellido").html('')
			if ($("#txtapellidos").val()== ""){
	        	$("#txtapellidos").css({"box-shadow" : "" , "border-color" : ""})
	        }
	        else { $("#txtapellidos").css({"border-color": "#28921f", 'box-shadow': '0 0 5px #5cd053' }) }
		})
		$("#txtcedula").keyup(function(){
			$("#tdCedula").html('')
			if ($("#txtcedula").val()== ""){
	        	$("#txtcedula").css({"box-shadow" : "" , "border-color" : ""})
	        }
	        else { $("#txtcedula").css({"border-color": "#28921f", 'box-shadow': '0 0 5px #5cd053' }) }
		})
		$("#txtcorreo").keyup(function(){
			$("#tdcorreo").html('')
			if ($("#txtcorreo").val()== ""){
	        	$("#txtcorreo").css({"box-shadow" : "" , "border-color" : ""})
	        }
	        else { $("#txtcorreo").css({"border-color": "#28921f", 'box-shadow': '0 0 5px #5cd053' }) }
		})
		$("#txttelefono").keyup(function(){
			$("#tdtelefono").html('')
			if ($("#txttelefono").val()== ""){
	        	$("#txttelefono").css({"box-shadow" : "" , "border-color" : ""})
	        }
	        else { $("#txttelefono").css({"border-color": "#28921f", 'box-shadow': '0 0 5px #5cd053' }) }
		})
		$("#txtparalelo").click(function(){
			$("#tdParalelo").html('')
			if ($("#txtparalelo").val()== "1"){
	        	$("#txtparalelo").css({"box-shadow" : "" , "border-color" : ""})
	        }
	        else { $("#txtparalelo").css({"border-color": "#28921f", 'box-shadow': '0 0 5px #5cd053' }) }
		})
		$("#txtcurso").keyup(function(){
			$("#tdcurso").html('')
			if ($("#txtcurso").val()== ""){
	        	$("#txtcurso").css({"box-shadow" : "" , "border-color" : ""})
	        }
	        else { $("#txtcurso").css({"border-color": "#28921f", 'box-shadow': '0 0 5px #5cd053' }) }
		})
		$("#txtnombre").keyup(function(){
			$("#tdNombre").html('')
			if ($("#txtnombre").val()== ""){
	        	$("#txtnombre").css({"box-shadow" : "" , "border-color" : ""})
	        }
	        else { $("#txtnombre").css({"border-color": "#28921f", 'box-shadow': '0 0 5px #5cd053' }) }
		})

		//guarda los datos 
		$("#btnenviar").click(function(){
			var nombre = $("#txtnombre").val()
			var apellido = $("#txtapellidos").val()
			var cedula = $("#txtcedula").val()
			var paralelo = $("#txtparalelo").val()
			var curso = $("#txtcurso").val()
			var correo = $("#txtcorreo").val()
			var telefono = $("#txttelefono").val()
			var fechaNac = $("#txtfecha").val()
			if (nombre!="" && apellido!="" && cedula!="" && cedula.length==10 && paralelo!="1" && telefono!="" && telefono.length==10 && correo!="" && curso!="" && fechaNac!="" ){
				datos = {Nombre:nombre , Apellido:apellido , Cedula:cedula , Paralelo:paralelo , Curso:curso , Correo:correo , Telefono:telefono , FechaNac:fechaNac}				
				$.ajax({
	               	type:"POST",
	              	url:"http://gestiondecalificacionesfacci.azurewebsites.net/Estudiante",
	               	dataType:"text",
	               	contentType:"application/json",
	               	data: JSON.stringify(datos)
	            }).done(function(msg){	
	            });  
				alert("Sus datos se ingresaron con éxito")

				$("#txtnombre").val(""); $("#txtapellidos").val(""); $("#txtcedula").val(""); $("#txtparalelo").val("1") ; $("#txtcurso").val(""); $("#txtcorreo").val(""); $("#txttelefono").val(""); $("fechaNac").val("");	
				$("#txtnombre").css({"box-shadow" : "" , "border-color" : ""})
				$("#txtapellidos").css({"box-shadow" : "" , "border-color" : ""})
				$("#txtcedula").css({"box-shadow" : "" , "border-color" : ""})
				$("#txtparalelo").css({"box-shadow" : "" , "border-color" : ""})
				$("#txtcurso").css({"box-shadow" : "" , "border-color" : ""})
				$("#txttelefono").css({"box-shadow" : "" , "border-color" : ""})
				$("#txtfechaNac").css({"box-shadow" : "" , "border-color" : ""})
				$("#txtcorreo").css({"box-shadow" : "" , "border-color" : ""})

			}
			//valida campos vacios
			else{
				if (nombre=="") {
					$("#txtnombre").css({"border-color": "red" , 'box-shadow': '0 0 5px #d45252'})
					$("#tdNombre").html('<td><div class="div"></div></td><td class="tdValidarAsignatura">Ingrese un dato por favor</td>')
				}	
				if (apellido=="") {
					$("#txtapellidos").css({"border-color": "red" , 'box-shadow': '0 0 5px #d45252'})
					$("#tdApellido").html('<td><div class="div"></div></td><td class="tdValidarAsignatura">Ingrese un dato por favor</td>')
				}
				if (cedula=="") {
					$("#txtcedula").css({"border-color": "red" , 'box-shadow': '0 0 5px #d45252'})
					$("#tdCedula").html('<td><div class="div"></div></td><td class="tdValidarAsignatura">Ingrese un dato por favor</td>')
				}
				if (cedula.length!=10 && cedula.length>=1) {
					$("#txtcedula").css({"border-color": "red" , 'box-shadow': '0 0 5px #d45252'})
					$("#tdCedula").html('<td><div class="div"></div></td><td class="tdValidarAsignatura">La cédula debe tener 10 dígitos</td>')
				}
				if (paralelo=="1") {
					$("#txtparalelo").css({"border-color": "red" , 'box-shadow': '0 0 5px #d45252'})
					$("#tdParalelo").html('<td><div class="div"></div></td><td class="tdValidarAsignatura">Elija una opción</td>')
				}
				if (correo=="") {
					$("#txtcorreo").css({"border-color": "red" , 'box-shadow': '0 0 5px #d45252'})
					$("#tdcorreo").html('<td><div class="div"></div></td><td class="tdValidarAsignatura">Ingrese un dato por favor</td>')
				}	
				if (telefono=="") {
					$("#txttelefono").css({"border-color": "red" , 'box-shadow': '0 0 5px #d45252'})
					$("#tdtelefono").html('<td><div class="div"></div></td><td class="tdValidarAsignatura">Ingrese un dato por favor</td>')
				}
				if (curso=="") {
					$("#txtcurso").css({"border-color": "red" , 'box-shadow': '0 0 5px #d45252'})
					$("#tdcurso").html('<td><div class="div"></div></td><td class="tdValidarAsignatura">Ingrese un dato por favor</td>')
				}
				if (telefono.length!=10 && telefono.length>=1) {
					$("#txttelefono").css({"border-color": "red" , 'box-shadow': '0 0 5px #d45252'})
					$("#tdtelefono").html('<td><div class="div"></div></td><td class="tdValidarAsignatura">La cédula debe tener 10 dígitos</td>')
				}
				if (fechaNac=="") {
					$("#txtfecha").css({"border-color": "red" , 'box-shadow': '0 0 5px #d45252'})
					$("#tdfecha").html('<td><div class="div"></div></td><td class="tdValidarAsignatura">Elija una opción</td>')
				}		
			}			
		})

	})
	//genera el formulario de Calificaciones al hacer click en el boton ingreso de calificaciones 
	$("#btncalificacion").click(function(){
		var calificacion ='<hr id="hr"><section id="sectionindex"><h2 id="h2calificacion">INGRESO DE CALIFICACIONES</h2>'
		    calificacion+='<article id="box"><table><tr><td><label class="labelcalificacion" for="asignatura">Escoga la Asignatura</label></td>'			
			calificacion+='<td><select class="inputcalificacion" id="asignatura" required><option value="" disabled selected>Elija una asignatura</option></select></td></tr>'
			calificacion+='<tr><td><label class="labelcalificacion" for="paralelo">Escoga el Paralelo</label></td>'
			calificacion+='<td><select class="inputcalificacion" id="paralelo" required><option value="" disabled selected>Elija un paralelo</option>'
			calificacion+='<option value="A">A</option><option value="B">B</option></select></td></tr></table>'	
		    calificacion+='<input type="button" value="mostrar" id="mostrarlista"></article></section><article id="contenido2"></article>'
		$("#contenido").html(calificacion)

		//recorre todos los objetos del array asignatura
		
			alert("bryan")
			$.ajax({
		            type:"GET",
		            url:"http://gestiondecalificacionesfacci.azurewebsites.net/Asignatura",
		            dataType:"json",
		            contentType:"text/plain"
	            }).done(function(msg){

				   	for(var dato in msg[0]){
				   	$("<option value="+msg[0][dato].Asignatura+">"+msg[0][dato].Asignatura+"</option>").appendTo("#asignatura")					
					}
				}) 
						
		$("#mostrarlista").click(function(){
			var eleccionParalelo = $("#paralelo").val()
			var eleccionAsignatura = $("#asignatura option:selected").text()
			var lista = '<article id="box">'

			alert("bryan")
			$.ajax({
		            type:"GET",
		            url:"http://gestiondecalificacionesfacci.azurewebsites.net/Estudiante",
		            dataType:"json",
		            contentType:"text/plain"
	            }).done(function(msg){

				   	for(var dato in msg[0]){
				   	$("<option value="+msg[0][dato].Asignatura+">"+msg[0][dato].Asignatura+"</option>").appendTo("#asignatura")					
					}
				}) 
						
			
			for(var dato in asignaturaArray){ 
				if (eleccionAsignatura == asignaturaArray[dato].asignatura) {
					lista +='<table class="tablecalificacion"><tr><td><label for="" class="label2calificacion">'
				    lista+='<span class="spancalificacion">Asignatura: </span>'+asignaturaArray[dato].asignatura+'</label></td><td><label for="" class="label2calificacion">'
	                lista+='<span class="spancalificacion">Paralelo: </span>'+eleccionParalelo+'</label></td><td><label for="" class="label2calificacion">'
					lista+='<span class="spancalificacion">Docente: </span>'+asignaturaArray[dato].docente+'</label></tr></table>'
				}
			}
			    
				lista+='<table border="1" class="tablecalificacion"><form action="#"><tr><th class="thcalificacion">Cédula</th><th class="thcalificacion">Estudiante</th><th class="thcalificacion">1° Parcial</th>'	
				lista+='<th class="thcalificacion">2° Parcial</th><th class="thcalificacion">Recuperación</th><th class="thcalificacion">Suma</th><th class="thcalificacion">Promedio</th></tr>'
				
			for(var dato in estudianteArray){ 
				if (eleccionParalelo == estudianteArray[dato].paralelo) {
					lista+='<tr class="trcalificacion"><td class="tdCalificacionCedula">'+estudianteArray[dato].cedula+'</td><td>'+estudianteArray[dato].apellido+' '+estudianteArray[dato].nombre+'</td>'
					lista+='<td class="tdcalificacion"><input class="inpCal" type="text" value="" max="10" id="primerParcial"></td><td class="tdcalificacion">'
					lista+='<input class="inpCal" type="text" value="" max=10 id="segundoParcial"></td><td class="tdcalificacion"><input class="inpCal" type="text" value="" id="recuperacion"></td>'
					lista+='<td class="inputresultado" id="suma" ></td><td class="inputresultado" id="promedio"></td></tr>'			
				}
			}
			lista+='</form></table><input type="button" value="Enviar" id="btnenviar1"></article>'			
			$("#contenido2").html(lista)

			$(".inpCal").each(function() {
				$(this).keypress(function(event){			
					key = event.keyCode || event.which;
					tecla = String.fromCharCode(key).toLowerCase();
					numeros = "1234567890.";
					especiales = "8-38-37-39-40-46";
					tecla_especial = false
					for(var i in especiales){
						if(key == especiales[i]){
							tecla_especial = true;
							break;
			            }
			        }
		        	if(numeros.indexOf(tecla)==-1 && !tecla_especial){ return false }	        
				})
			})

			$("#btnenviar1").click(function(){
				if ($("#primerParcial").val()=="" || $("#segundoParcial").val()=="" || $("#recuperacion").val()=="") {
					alert("No se han completado todos los datos")}
				else{alert("Sus datos se enviaron con éxito")}
			})

			$(".trcalificacion").change(function(){
				var resultado = 0 ; var promedio = 0 ; 
				
				var valor1 = $(this).find("td:eq(2)>input").val()
				var valor2 = $(this).find("td:eq(3)>input").val()

				resultado = parseFloat(valor1) + parseFloat(valor2)
				resultado = resultado.toFixed(2)
				$(this).find('td:eq(5)').html(resultado)

				promedio = resultado/2
				promedio = promedio.toFixed(2)

				if (promedio >= 7) {
					$(this).find("td:eq(6)").css("color","green")
					
				}
				else{
					$(this).find("td:eq(6)").css("color","red")
				}
				$(this).find("td:eq(6)").html(promedio)
			})
		})
	})
})  	