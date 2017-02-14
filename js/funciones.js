$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({
		 trigger: 'hover',
		 placement : 'top',
		 'show': true
    });
});

var ordenado= new Array;
var contador=0;
var $lista_ordenado;	
$(function() {
	
	
	$("#add_numero").click(function(e) {	
	
	var existe=false;
	var numero =	jQuery('#numero').val();
	console.log(numero.length);
	if(numero.length<=0){
	bootbox.alert("Debe ingresar un número");	
	}else{
	
		$("#lista_numeros" ).find(".numero_contenedor .numero").each(function (i, e) {
			if ($(this).text()== numero){
				existe=true;
				bootbox.alert(numero+" ya existe");
				return false;
			}
		});
		
			
		if(!existe){
			var $fila= $("<div class='numero_contenedor'><div class='img_delete'></div><div class='numero'>"+numero+"</div></div>");
			$("#lista_numeros" ).append($fila);
			$fila.mouseover(function () {$(this).find('.img_delete').animate({opacity: 0.75},{duration:500,queue:false}); })
			.mouseout(function () {$(this).find('.img_delete').animate({opacity: 0},{duration:500,queue:false}); });
			
			
			$fila.find(".img_delete").click(function(e) {	
				if($("#lista_numeros" ).find(".numero_contenedor").length<=2){
						$("#order_numero").attr("disabled","disabled");
				}
				$(this).parent().fadeOut(400,function(){
					$(this).remove();
					
				});
				
				
			});
		
			if($("#lista_numeros" ).find(".numero_contenedor").length==2){
				$("#order_numero").removeAttr("disabled");
			}
		}
	}
		
	});
	
	
	
	$("#order_numero").click(function(e) {
		$lista_ordenado=$("<div class='lista_numeros_order'> </div>");
		$("#order_numero").attr("disabled","disabled");
		$("#add_numero").attr("disabled","disabled");
		
		contador=0;
		 var numeros_array= new Array;		
		// var ordenado= new Array;
		 
		 $("#lista_numeros").find(".numero_contenedor .numero").each(function (i, e) {
			numeros_array.push(parseInt($(this).text()));
			
		});
		console.log(numeros_array);
		
		ordenado=burbuja(numeros_array);
		console.log(ordenado);
		
		$("#lista_numeros").parent().append($lista_ordenado);
		
		
		for (var i=0; i < ordenado.length; i++) {
			setTimeout(function() {
			var $fila= $("<div class='numero_contenedor'><div class='img_delete'></div><div class='numero'>"+ordenado[contador]+"</div></div>");
			$lista_ordenado.append($fila);
			contador++;
			if(contador==ordenado.length){
				$("#lista_numeros").fadeOut(400,function(){
					$(this).remove();
					$lista_ordenado.attr("id","lista_numeros");
					$lista_ordenado.find(".numero_contenedor").mouseover(function () {$(this).find('.img_delete').animate({opacity: 0.75},{duration:500,queue:false}); })
					.mouseout(function () {$(this).find('.img_delete').animate({opacity: 0},{duration:500,queue:false}); });
					
					$("#add_numero").removeAttr("disabled");
					$("#order_numero").removeAttr("disabled");
					
					$lista_ordenado.find(".img_delete").click(function(e) {	
						if($("#lista_numeros" ).find(".numero_contenedor").length<=2){
								$("#order_numero").attr("disabled","disabled");
						}
						
						$(this).parent().fadeOut(400,function(){
							$(this).remove();
							
						});
						
						
					});
					
			
				});
				
			}
			
			
			}, 1000*(i+1));
			
		}
		
				
	});
	
	
	/*************Metodo de la burbuja*****************/
	
	function burbuja(arreglo){
    //recorreremos todos los elementos hasta n-1
    for(i=0;i<(arreglo.length-1);i++)
    //recorreremos todos los elementos hasta n-i, tomar en cuenta los ultimos no tiene caso ya que ya estan acomodados.
		for(j=0;j<(arreglo.length-i);j++){
	 
			//comparamos
			if(arreglo[j]>arreglo[j+1]){
				 //guardamos el numero mayor en el auxiliar
				 aux=arreglo[j];
				 //guardamos el numero menor en el lugar correspondiente
				 arreglo[j]=arreglo[j+1];
				 //asignamos el auxiliar en el lugar correspondiente
				 arreglo[j+1]=aux;
	 
			}
	 
		}
	 
		return arreglo
	}
	
});


