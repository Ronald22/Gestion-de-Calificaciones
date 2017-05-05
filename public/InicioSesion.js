$(document).ready(function(){
	$("#btnIniciarSesion").click(function(){
		var band = 0;
		var Usuario = $("#txtUsuario").val();
		var Contraseña = $("#txtContraseña").val();

		$.ajax({
			type:"GET",
			url:"http://gestiondecalificacionesfacci.azurewebsites.net/Administrador",
			dataType:"json",
			contentType:"text/plain"
		}).done(function(msg){
			for(var dato in msg[0]){
				if ((msg[0][dato].Usuario == Usuario) && (msg[0][dato].Contraseña == Contraseña)){
					band == 1	                       
                    window.location.href='Home.html';                       
                }                    
			}
			if(band != 1){
                alert("Datos Incorrectos")
            }
		});
	});
});