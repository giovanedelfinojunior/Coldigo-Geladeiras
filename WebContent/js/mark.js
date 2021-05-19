COLDIGO.marca = new Object();

$(document).ready( function() {
	COLDIGO.marca.cadastrar = function () {
	    var marca = new Object();
	
	    marca.nome = document.frmAddMarca.nome.value;
	
	    if (marca.nome == ""){
	      COLDIGO.exibirAviso("Preencha o campo nome");
	    } else {
	      $.ajax({
	        type: "POST",
	        url: COLDIGO.PATH + "marca/inserir",
	        data: JSON.stringify(marca),
	        success: (msg) => {
	          COLDIGO.exibirAviso(msg);
	          $("#addMarca").trigger("reset");
			  COLDIGO.marca.buscar();
	        },
	        error: (info) => {
	          COLDIGO.exibirAviso(
	            "Erro ao cadastrar uma novo marca: " +
	              info.status +
	              " - " +
	              info.statusText
	          );
	        },
	      });
	    }
	  };
	COLDIGO.marca.buscar = function(){
		
		var valorBusca = $("#campoBuscaMarca").val();
		
		$.ajax({
			type: "GET",
	        url: COLDIGO.PATH + "marca/buscar",
	        success: function(marcas){
		
			 	$("#listaMarcas").html(COLDIGO.marca.exibir(marcas));
	
	       	},
	        error: function(info){
	          COLDIGO.exibirAviso(
	            "Erro ao consultar os contatos: " +
	              info.status +
	              " - " +
	              info.statusText);
	        }
		});
		
		COLDIGO.marca.exibir = function(listaDeMarcas){
			
			var tabela = "<table>" +
			"<tr>" +
			"<th>Nome da Marca</th>" +
			"<th class='acoes'>Ações</th>" +
			"</tr>";
			
			if(listaDeMarcas != undefined && listaDeMarcas.length > 0){
				
				for (var i=0; i<listaDeMarcas.length; i++){
					tabela += "<tr>" +
					"<td>"+listaDeMarcas[i].nome+"</td>" +
					"<td>" +
						"<a onclick=\"COLDIGO.marca.exibirEdicao('"+listaDeMarcas[i].id+"')\"><img src='../../imgs/edit.png' alt='Editar registro'></a> " +
						"<a onclick=\"COLDIGO.marca.excluir('"+listaDeMarcas[i].id+"')\"><img src='../../imgs/delete.png' alt='Excluir registro'></a>" +
					"</td>" +
					"</tr>"
				}
				
			}else if(listaDeMarcas == ""){
				tabela += "<tr><td>Nenhum registro encontrado</td></tr>";
			}
			tabela += "</table>";
			
			return tabela;
		};
		
	};
	
	COLDIGO.marca.buscar();
	
	COLDIGO.marca.excluir = function(id){
		$.ajax({
			type: "DELETE",
	        url: COLDIGO.PATH + "marca/excluir/"+id,
	        success: function(msg){
		
	        	COLDIGO.exibirAviso(msg);
				COLDIGO.marca.buscar();
	
	       	},
	        error: function(info){
	          COLDIGO.exibirAviso(
	            "Erro ao consultar os contatos: " +
	              info.status +
	              " - " +
	              info.statusText);
	        }
		});
	}
	
	COLDIGO.marca.exibirEdicao = function(id){
		
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscarPorId",
			data: "id="+id,
			success: function(marca){
				
				document.frmEditaMarca.idMarca.value = marca.id;
				document.frmEditaMarca.nome.value = marca.nome;
				
				var modalEditaMarca = {
						title: "Editar marca",
						height: 400,
						width: 550,
						modal: true,
						buttons:{
							"Salvar": function(){
								COLDIGO.marca.editar();
								$(this).dialog("close");
							},
							"Cancelar": function(){
								$(this).dialog("close");
							}
						},
						close: function(){
						}
				};
				
				$("#modalEditaMarca").dialog(modalEditaMarca);
				
			},
			error: function(info){
				
				COLDIGO.exibirAviso("Erro ao buscar o marca para edição: "+info.status+" - "+info.statusText);
			}
		});
	};
		
	COLDIGO.marca.editar = function (){
		
		var marca = new Object();
		marca.id = document.frmEditaMarca.idMarca.value;
		marca.nome = document.frmEditaMarca.nome.value;
		
		$.ajax({
			type: "PUT",
			url: COLDIGO.PATH + "marca/alterar",
			data: JSON.stringify(marca),
			success: function(msg){
				COLDIGO.exibirAviso(msg);
				COLDIGO.marca.buscar();
				$("#modalEditaMarca").dialog("close");
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao editar marca: "+info.status+" - "+info.statusText);
			}
		});
		
	}
});